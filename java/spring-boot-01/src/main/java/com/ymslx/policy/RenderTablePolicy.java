package com.ymslx.policy;

import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.exception.RenderException;
import com.deepoove.poi.policy.RenderPolicy;
import com.deepoove.poi.render.compute.EnvModel;
import com.deepoove.poi.render.compute.RenderDataCompute;
import com.deepoove.poi.render.processor.DocumentProcessor;
import com.deepoove.poi.render.processor.EnvIterator;
import com.deepoove.poi.resolver.TemplateResolver;
import com.deepoove.poi.template.ElementTemplate;
import com.deepoove.poi.template.MetaTemplate;
import com.deepoove.poi.template.run.RunTemplate;
import com.deepoove.poi.util.ReflectionUtils;
import com.deepoove.poi.util.TableTools;
import org.apache.poi.xwpf.usermodel.*;
import org.apache.xmlbeans.XmlCursor;
import org.apache.xmlbeans.XmlObject;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTRow;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTcPr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTVMerge;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.STMerge;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

/**
 * 付款通知书 明细表格的自定义渲染策略<br/>
 * 1. 填充货品数据 <br/>
 * 2. 填充人工费数据 <br/>
 * @author Sayi
 * @version
 */
public class RenderTablePolicy implements RenderPolicy {

    private String prefix = "[";
    private String suffix = "]";

    public void render(ElementTemplate eleTemplate, Object data, XWPFTemplate template) {
        RunTemplate runTemplate = (RunTemplate)eleTemplate;
        XWPFRun run = runTemplate.getRun();

        try {
            if (!TableTools.isInsideTable(run)) {
                throw new IllegalStateException("The template tag " + runTemplate.getSource() + " must be inside a table");
            } else {
                XWPFTableCell tagCell = (XWPFTableCell)((XWPFParagraph)run.getParent()).getBody();
                XWPFTable table = tagCell.getTableRow().getTable();
                run.setText("", 0);
                int templateRowIndex = this.getTemplateRowIndex(tagCell);
                if (null != data && data instanceof Iterable) {
                    Iterator<?> iterator = ((Iterable)data).iterator();
                    XWPFTableRow templateRow = table.getRow(templateRowIndex);
                    TemplateResolver resolver = new TemplateResolver(template.getConfig().copy(this.prefix, this.suffix));
                    boolean firstFlag = true;
                    int index = 0;
                    boolean hasNext = iterator.hasNext();

                    while(hasNext) {
                        Object root = iterator.next();
                        // 确保root对象是HashMap类型时，可以正确处理SpEL表达式
                        if (root instanceof HashMap) {
                            root = new HashMap<>((HashMap) root);
                        }
                        hasNext = iterator.hasNext();
                        int insertPosition = templateRowIndex++;
                        table.insertNewTableRow(insertPosition);
                        this.setTableRow(table, templateRow, insertPosition);
                        XmlCursor newCursor = templateRow.getCtRow().newCursor();
                        newCursor.toPrevSibling();
                        XmlObject object = newCursor.getObject();
                        XWPFTableRow nextRow = new XWPFTableRow((CTRow)object, table);
                        if (!firstFlag) {
                            for(XWPFTableCell cell : nextRow.getTableCells()) {
                                CTTcPr tcPr = TableTools.getTcPr(cell);
                                CTVMerge vMerge = tcPr.getVMerge();
                                if (null != vMerge && STMerge.RESTART == vMerge.getVal()) {
                                    vMerge.setVal(STMerge.CONTINUE);
                                }
                            }
                        } else {
                            firstFlag = false;
                        }

                        this.setTableRow(table, nextRow, insertPosition);
                        RenderDataCompute dataCompute = template.getConfig().getRenderDataComputeFactory().newCompute(EnvModel.of(root, EnvIterator.makeEnv(index++, hasNext)));
                        System.out.println("dataCompute:" + dataCompute);
                        List<XWPFTableCell> cells = nextRow.getTableCells();
                        cells.forEach((cellx) -> {
                            List<MetaTemplate> templates = resolver.resolveBodyElements(cellx.getBodyElements());
                            (new DocumentProcessor(template, resolver, dataCompute)).process(templates);
                        });
                    }
                }

                table.removeRow(templateRowIndex);

                // 开始遍历所有行,找出有上箭头的数据, 并且合并行列
                calculateMergeRanges(table);


                this.afterloop(table, data);
            }
        } catch (Exception e) {
            throw new RenderException("HackLoopTable for " + eleTemplate + "error: " + e.getMessage(), e);
        }
    }

    private int getTemplateRowIndex(XWPFTableCell tagCell) {
        XWPFTableRow tagRow = tagCell.getTableRow();
        Boolean onSameLine = false;
        List<XWPFTableCell> cells = tagRow.getTableCells();
        for (XWPFTableCell cell : cells) {
            // 正则匹配到[/s]
            if (cell == null) continue;
            String input = cell.getText();
            if (input.contains("[") && input.contains("]") && input.indexOf("[") < input.indexOf("]")) {
                onSameLine = true;
                break;
            }
        }
        return onSameLine ? this.getRowIndex(tagRow) : this.getRowIndex(tagRow) + 1;
    }

    protected void afterloop(XWPFTable table, Object data) {
    }

    private void setTableRow(XWPFTable table, XWPFTableRow templateRow, int pos) {
        List<XWPFTableRow> rows = (List) ReflectionUtils.getValue("tableRows", table);
        rows.set(pos, templateRow);
        table.getCTTbl().setTrArray(pos, templateRow.getCtRow());
    }

    private int getRowIndex(XWPFTableRow row) {
        List<XWPFTableRow> rows = row.getTable().getRows();
        return rows.indexOf(row);
    }

    private void calculateMergeRanges(XWPFTable table) {
        // 添加单位行
//        List<Map<String, Object>> list = new ArrayList<>();
        // 行合并 参数 col formRow toRow
        // 列合并 参数 row formCol toCol
        List<XWPFTableRow> rows = table.getRows();
        // 遍历 行
        for (int i = 0; i < rows.size(); i++) {
            XWPFTableRow row = rows.get(i);
            List<XWPFTableCell> cells = row.getTableCells();
            // 遍历每行的列
            for (int j = 0; j < cells.size(); j++) {
                XWPFTableCell cell = cells.get(j);
                if (cell == null) {
                    continue;
                }
                if (!cell.getText().equals("↑")) {
                    int currentRowIndex = i + 1;
                    int spanRow = 1;
                    while (currentRowIndex < rows.size()) {
                        XWPFTableRow currentRow = table.getRow(currentRowIndex);
                        if (currentRow.getCell(j) != null && currentRow.getCell(j).getText().equals("↑")) {
                            spanRow++;
                        } else {
                            break;
                        }
                        currentRowIndex++;
                    }
                    if (spanRow > 1) {
                        TableTools.mergeCellsVertically(table, j, i, (i + spanRow - 1));
//                        list.add(Map.of("type","row", "col", j, "formRow", i, "toRow", i + spanRow - 1));
                    }
                }
            }
        }

        rows = table.getRows();
        // 遍历 行
        for (int i = 0; i < rows.size(); i++) {
            XWPFTableRow row = rows.get(i);
            List<XWPFTableCell> cells = row.getTableCells();
            // 遍历每行的列
            for (int j = 0; j < cells.size(); j++) {
                XWPFTableCell cell = cells.get(j);
                if (cell == null) {
                    continue;
                }
                if (!cell.getText().equals("←")) {
                    int currentCellIndex = j + 1;
                    int spanCol = 1;
                    while (currentCellIndex < cells.size()) {
                        XWPFTableCell currentCell = cells.get(currentCellIndex);
                        if (currentCell.getText().equals("←")) {
                            spanCol++;
                        } else {
                            break;
                        }
                        currentCellIndex++;
                    }
                    if (spanCol > 1) {
                        // row formCol toCol
                        TableTools.mergeCellsHorizonal(table, i, j, j + spanCol - 1);
//                        list.add(Map.of("type","col", "col", i, "formRow", j, "toRow", j + spanCol - 1));
                    }
                }
            }
        }

//        return list;
    }

}
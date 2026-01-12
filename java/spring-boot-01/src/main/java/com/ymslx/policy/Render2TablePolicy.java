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
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTRow;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTbl;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTcPr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTVMerge;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.STMerge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

/**
 * 多行循环表格渲染策略<br/>
 * 1. 支持单行循环（与RenderTablePolicy兼容）<br/>
 * 2. 支持多行模板循环：检测连续行中包含[列标记]的行作为模板行组<br/>
 * 3. 正确渲染数组数据到多行模板<br/>
 */
public class Render2TablePolicy implements RenderPolicy {

    private String prefix = "[";
    private String suffix = "]";

    @Override
    public void render(ElementTemplate eleTemplate, Object data, XWPFTemplate template) {
        RunTemplate runTemplate = (RunTemplate) eleTemplate;
        XWPFRun run = runTemplate.getRun();

        try {
            if (!TableTools.isInsideTable(run)) {
                throw new IllegalStateException("The template tag " + runTemplate.getSource() + " must be inside a table");
            }

            XWPFTableCell tagCell = (XWPFTableCell) ((XWPFParagraph) run.getParent()).getBody();
            XWPFTable table = tagCell.getTableRow().getTable();
            run.setText("", 0);

            int templateRowIndex = getTemplateRowIndex(tagCell);

            if (null != data && data instanceof Iterable) {
                Iterator<?> iterator = ((Iterable<?>) data).iterator();

                // 计算模板行数（检测连续包含[xxx]标记的行）
                int templateRowCount = calculateTemplateRowCount(table, templateRowIndex);

                // 保存模板行的CTRow副本
                List<CTRow> templateCtRows = new ArrayList<>();
                for (int i = 0; i < templateRowCount; i++) {
                    XWPFTableRow row = table.getRow(templateRowIndex + i);
                    templateCtRows.add((CTRow) row.getCtRow().copy());
                }

                TemplateResolver resolver = new TemplateResolver(template.getConfig().copy(this.prefix, this.suffix));
                int index = 0;
                boolean hasNext = iterator.hasNext();
                int currentInsertPosition = templateRowIndex;

                while (hasNext) {
                    Object root = iterator.next();
                    if (root instanceof HashMap) {
                        root = new HashMap<>((HashMap<?, ?>) root);
                    }
                    hasNext = iterator.hasNext();

                    // 为每个数据项复制所有模板行
                    List<XWPFTableRow> newRows = new ArrayList<>();
                    for (int rowIdx = 0; rowIdx < templateRowCount; rowIdx++) {
                        CTRow templateCtRow = templateCtRows.get(rowIdx);
                        int insertPosition = currentInsertPosition++;

                        // 创建新行
                        XWPFTableRow newRow = insertNewRow(table, templateCtRow, insertPosition);
                        
                        // 处理每组数据内部的垂直合并
                        // 第一行保持 RESTART，后续行保持 CONTINUE
                        if (rowIdx == 0) {
                            // 第一行：确保合并单元格是 RESTART
                            for (XWPFTableCell cell : newRow.getTableCells()) {
                                CTTcPr tcPr = TableTools.getTcPr(cell);
                                CTVMerge vMerge = tcPr.getVMerge();
                                if (null != vMerge) {
                                    vMerge.setVal(STMerge.RESTART);
                                }
                            }
                        }
                        // 后续行的 CONTINUE 状态从模板复制过来，不需要修改

                        newRows.add(newRow);
                    }

                    // 渲染所有新插入的行
                    RenderDataCompute dataCompute = template.getConfig().getRenderDataComputeFactory()
                            .newCompute(EnvModel.of(root, EnvIterator.makeEnv(index++, hasNext)));

                    for (XWPFTableRow newRow : newRows) {
                        List<XWPFTableCell> cells = newRow.getTableCells();
                        for (XWPFTableCell cell : cells) {
                            List<MetaTemplate> templates = resolver.resolveBodyElements(cell.getBodyElements());
                            new DocumentProcessor(template, resolver, dataCompute).process(templates);
                        }
                    }
                }

                // 删除原始模板行（从后往前删除）
                for (int i = templateRowCount - 1; i >= 0; i--) {
                    table.removeRow(currentInsertPosition + i);
                }

                // 处理合并单元格（↑ 和 ← 标记）
                calculateMergeRanges(table);

                afterloop(table, data);
            } else {
                // 如果没有数据，删除模板行
                int templateRowCount = calculateTemplateRowCount(table, templateRowIndex);
                for (int i = templateRowCount - 1; i >= 0; i--) {
                    table.removeRow(templateRowIndex + i);
                }
            }
        } catch (Exception e) {
            throw new RenderException("Render2TablePolicy for " + eleTemplate + " error: " + e.getMessage(), e);
        }
    }

    /**
     * 在指定位置插入新行（基于模板CTRow）
     */
    private XWPFTableRow insertNewRow(XWPFTable table, CTRow templateCtRow, int insertPosition) {
        CTTbl ctTbl = table.getCTTbl();

        // 在指定位置插入新的CTRow
        CTRow newCtRow = ctTbl.insertNewTr(insertPosition);
        newCtRow.set(templateCtRow.copy());

        // 创建XWPFTableRow
        XWPFTableRow newRow = new XWPFTableRow(newCtRow, table);

        // 更新table的内部行列表
        @SuppressWarnings("unchecked")
        List<XWPFTableRow> rows = (List<XWPFTableRow>) ReflectionUtils.getValue("tableRows", table);
        rows.add(insertPosition, newRow);

        return newRow;
    }

    /**
     * 计算模板行数量
     */
    private int calculateTemplateRowCount(XWPFTable table, int startRowIndex) {
        int count = 1;
        int totalRows = table.getRows().size();

        for (int i = startRowIndex + 1; i < totalRows; i++) {
            XWPFTableRow row = table.getRow(i);
            if (rowContainsTemplateTag(row)) {
                count++;
            } else {
                break;
            }
        }
        return count;
    }

    /**
     * 检查行是否包含模板标记 [xxx]
     */
    private boolean rowContainsTemplateTag(XWPFTableRow row) {
        if (row == null) return false;

        List<XWPFTableCell> cells = row.getTableCells();
        for (XWPFTableCell cell : cells) {
            if (cell == null) continue;
            String text = cell.getText();
            if (text != null && text.contains(prefix) && text.contains(suffix)) {
                int prefixIdx = text.indexOf(prefix);
                int suffixIdx = text.indexOf(suffix);
                if (prefixIdx < suffixIdx) {
                    return true;
                }
            }
        }
        return false;
    }

    private int getTemplateRowIndex(XWPFTableCell tagCell) {
        XWPFTableRow tagRow = tagCell.getTableRow();
        boolean onSameLine = false;
        List<XWPFTableCell> cells = tagRow.getTableCells();
        for (XWPFTableCell cell : cells) {
            if (cell == null) continue;
            String input = cell.getText();
            if (input.contains("[") && input.contains("]") && input.indexOf("[") < input.indexOf("]")) {
                onSameLine = true;
                break;
            }
        }
        return onSameLine ? getRowIndex(tagRow) : getRowIndex(tagRow) + 1;
    }

    protected void afterloop(XWPFTable table, Object data) {
    }

    private int getRowIndex(XWPFTableRow row) {
        List<XWPFTableRow> rows = row.getTable().getRows();
        return rows.indexOf(row);
    }

    private void calculateMergeRanges(XWPFTable table) {
        // 垂直合并（处理 ↑ 标记）
        int rowCount = table.getNumberOfRows();
        for (int i = 0; i < rowCount; i++) {
            XWPFTableRow row = table.getRow(i);
            if (row == null) continue;

            int cellCount = row.getTableCells().size();
            for (int j = 0; j < cellCount; j++) {
                XWPFTableCell cell = row.getCell(j);
                if (cell == null) continue;

                String cellText = cell.getText();
                if (cellText != null && !cellText.equals("↑")) {
                    int currentRowIndex = i + 1;
                    int spanRow = 1;
                    while (currentRowIndex < rowCount) {
                        XWPFTableRow currentRow = table.getRow(currentRowIndex);
                        if (currentRow != null) {
                            XWPFTableCell currentCell = currentRow.getCell(j);
                            if (currentCell != null && "↑".equals(currentCell.getText())) {
                                spanRow++;
                            } else {
                                break;
                            }
                        } else {
                            break;
                        }
                        currentRowIndex++;
                    }
                    if (spanRow > 1) {
                        TableTools.mergeCellsVertically(table, j, i, i + spanRow - 1);
                    }
                }
            }
        }

        // 水平合并（处理 ← 标记）
        rowCount = table.getNumberOfRows();
        for (int i = 0; i < rowCount; i++) {
            XWPFTableRow row = table.getRow(i);
            if (row == null) continue;

            List<XWPFTableCell> cells = row.getTableCells();
            int cellCount = cells.size();
            for (int j = 0; j < cellCount; j++) {
                XWPFTableCell cell = cells.get(j);
                if (cell == null) continue;

                String cellText = cell.getText();
                if (cellText != null && !cellText.equals("←")) {
                    int currentCellIndex = j + 1;
                    int spanCol = 1;
                    while (currentCellIndex < cellCount) {
                        XWPFTableCell currentCell = cells.get(currentCellIndex);
                        if (currentCell != null && "←".equals(currentCell.getText())) {
                            spanCol++;
                        } else {
                            break;
                        }
                        currentCellIndex++;
                    }
                    if (spanCol > 1) {
                        TableTools.mergeCellsHorizonal(table, i, j, j + spanCol - 1);
                    }
                }
            }
        }
    }
}

package com.ymslx.policy;

import com.deepoove.poi.policy.DynamicTableRenderPolicy;
import com.deepoove.poi.util.TableTools;
import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 付款通知书 明细表格的自定义渲染策略<br/>
 * 1. 填充货品数据 <br/>
 * 2. 填充人工费数据 <br/>
 * @author Sayi
 * @version
 */
public class DetailTablePolicy extends DynamicTableRenderPolicy {

//    // 货品填充数据所在行数
//    int goodsStartRow = 2;
//    // 人工费填充数据所在行数
//    int laborsStartRow = 5;

    @Override
    public void render(XWPFTable table, Object data) throws Exception {
        if (null == data) return;
        System.out.println("detailData:-------------------------------------------");

        int startRowIndex = 0;
        while (!table.getRow(startRowIndex).getCell(0).getText().isEmpty()) {
            startRowIndex++;
        }
        startRowIndex++;

        int cellSize = table.getRow(startRowIndex).getTableICells().size();
        List<Map<String, Object>> dcVoltageList = (List<Map<String, Object>>)data;

        dcVoltageList = calculateMergeRanges(dcVoltageList, cellSize);
        renderTableContent(table, dcVoltageList, startRowIndex, cellSize);
        applyMerges(table, dcVoltageList, startRowIndex, cellSize);
    }

    private List<Map<String, Object>> calculateMergeRanges(List<Map<String, Object>> dcVoltageList, int cellSize) {
        // 添加单位行
        List<Map<String, Object>> list = new ArrayList<>();
        String memoUnit = null;
        for (int i = 0; i < dcVoltageList.size(); i++) {
            HashMap<String, Object> item = (HashMap<String, Object>) dcVoltageList.get(i);
            String unit = item.get("unit").toString();
            if (!unit.equals(memoUnit)) {
                HashMap<String, Object> newItem = new HashMap<String, Object>();
                newItem.put("range", "(" + unit +")");
                newItem.put("standard", "(" + unit +")");
                newItem.put("positive", "+      (" + unit +")      -");
                newItem.put("negative", null);
                newItem.put("uncertainty", "/");
                newItem.put("colSpan", 3);
                list.add(newItem);
                list.add(item);
                memoUnit = unit;
            } else {
                list.add(item);
            }
        }
        System.out.println(list);
        for (int i = 0; i < list.size(); i++) {
            HashMap<String, Object> item = (HashMap<String, Object>) list.get(i);
            int j = i + 1;
            String memoRange = item.get("range").toString();
            while (j < list.size() && memoRange.equals(list.get(j).get("range"))) {
                j++;
            }
            if (j - i > 1) {
                item.put("rowSpan", j - i);
                i = j - 1;
            }
        }

        return list;
    }

    private void renderTableContent(XWPFTable table, List<Map<String, Object>> dcVoltageList, int startRowIndex, int cellSize) {
        // 清除模板行（保留标题行）
        while(table.getRows().size() > startRowIndex) {
            table.removeRow(startRowIndex);
        }

        XWPFTableRow firstRow = table.getRow(startRowIndex - 1);
        Map<String, Object> firstRowData = dcVoltageList.get(0);

        firstRow.getCell(0).setText(firstRowData.get("range").toString());
        firstRow.getCell(1).setText(firstRowData.get("standard").toString());
        firstRow.getCell(2).setText(firstRowData.get("positive").toString());

        firstRow.getCell(0).getParagraphs().get(0).setAlignment(ParagraphAlignment.CENTER);
        firstRow.getCell(1).getParagraphs().get(0).setAlignment(ParagraphAlignment.CENTER);
        firstRow.getCell(2).getParagraphs().get(0).setAlignment(ParagraphAlignment.CENTER);

        // 添加数据行
        for (int i = 1; i < dcVoltageList.size(); i++) {
            Map<String, Object> dcVoltage = dcVoltageList.get(i);
            XWPFTableRow newRow = table.createRow();
            newRow.getCell(0).setText(dcVoltage.get("range").toString());
            newRow.createCell().setText(dcVoltage.get("standard").toString());
            newRow.createCell().setText(dcVoltage.get("positive").toString());
            if (cellSize > 4) {
                newRow.createCell().setText(dcVoltage.get("negative") != null ? dcVoltage.get("negative").toString() : "");
            }
            newRow.createCell().setText(dcVoltage.get("uncertainty").toString());

            newRow.getCell(0).getParagraphs().get(0).setAlignment(ParagraphAlignment.CENTER);
            newRow.getCell(1).getParagraphs().get(0).setAlignment(ParagraphAlignment.CENTER);
            newRow.getCell(2).getParagraphs().get(0).setAlignment(ParagraphAlignment.CENTER);
            if (cellSize > 4) {
                newRow.getCell(3).getParagraphs().get(0).setAlignment(ParagraphAlignment.CENTER);
                newRow.getCell(4).getParagraphs().get(0).setAlignment(ParagraphAlignment.CENTER);
            } else {
                newRow.getCell(3).getParagraphs().get(0).setAlignment(ParagraphAlignment.CENTER);
            }
        }
    }

    private void applyMerges(XWPFTable table, List<Map<String, Object>> dcVoltageList, int startRowIndex, int cellSize) {
//        TableTools.mergeCellsVertically(table, 0, 3, 5);
//        TableTools.mergeCellsVertically(table, 0, 6, 7);
        // 排除第一列
        startRowIndex = startRowIndex - 1;
         for (int i = 1; i < dcVoltageList.size(); i++) {
            Map<String, Object> dcVoltage = dcVoltageList.get(i);
            if (dcVoltage.containsKey("rowSpan")) {
                int rowSpan = (int) dcVoltage.get("rowSpan");
                if (rowSpan > 1) {
                    // 第几列  formRow  toRow
                    int formRow = i + startRowIndex;
                    int toRow = i + rowSpan + startRowIndex - 1;

                    System.out.println("formRow:" + formRow + " toRow:" + toRow);

                    TableTools.mergeCellsVertically(table, 0, formRow, toRow);
                    TableTools.mergeCellsVertically(table, cellSize - 1, formRow, toRow);

                    table.getRow(formRow).getCell(0).setVerticalAlignment(XWPFTableCell.XWPFVertAlign.CENTER);
                    table.getRow(formRow).getCell(cellSize - 1).setVerticalAlignment(XWPFTableCell.XWPFVertAlign.CENTER);
                }
            }

            if (dcVoltage.containsKey("colSpan") && cellSize > 4) {
                int formRow = i + startRowIndex;
                TableTools.mergeCellsHorizonal(table, formRow, 2, 3);
            }
        }
    }

}
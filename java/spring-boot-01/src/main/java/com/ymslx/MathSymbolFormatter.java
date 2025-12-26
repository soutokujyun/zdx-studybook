package com.ymslx;

import com.deepoove.poi.data.TextRenderData;
import com.deepoove.poi.data.style.Style;

import java.util.regex.Pattern;
public class MathSymbolFormatter {

    // Unicode 范围定义：数学字母、上下标等特殊字符
    private static final Pattern MATH_SYMBOL_PATTERN = Pattern.compile(
            "[\uD835\uDC00-\uD835\uDFFF\uD835\uDC00-\uD835\uDFFF" + // 数学字母
                    "\u2070-\u209F" +  // 上标和下标
                    "\u2100-\u214F]"
    );

    /**
     * 智能格式化文本：自动为包含数学符号的文本应用 Cambria Math 字体
     */
    public static TextRenderData formatText(String text) {
        if (containsMathSymbols(text)) {
            return createMathText(text);
        }
        return new TextRenderData(text); // 普通文本保持原样
    }

    /**
     * 检查字符串是否包含数学符号
     */
    public static boolean containsMathSymbols(String text) {
        return text != null && MATH_SYMBOL_PATTERN.matcher(text).find();
    }

    /**
     * 创建带有 Cambria Math 字体的文本
     */
    private static TextRenderData createMathText(String mathText) {
        Style mathStyle = Style.builder()
                .buildFontFamily("Cambria Math")  // 主要字体
                .buildFontSize(12)                // 保持原字号
                .build();

        return new TextRenderData(mathText, mathStyle);
    }

    /**
     * 处理混合内容：普通文本和数学符号混合的情况
     */
    public static TextRenderData formatMixedContent(String text) {
        // 如果整个字符串都是数学符号
        if (isAllMathSymbols(text)) {
            return createMathText(text);
        }

        // 如果包含部分数学符号，这里可以扩展实现分段格式化
        // 实际使用中，poi-tl 可能不支持同一字段内不同样式
        // 所以简单处理为：只要包含数学符号就整体应用数学字体
        if (containsMathSymbols(text)) {
            return createMathText(text);
        }

        return new TextRenderData(text);
    }

    /**
     * 检查是否全部由数学符号组成
     */
    private static boolean isAllMathSymbols(String text) {
        if (text == null || text.isEmpty()) return false;
        return MATH_SYMBOL_PATTERN.matcher(text).matches();
    }
}

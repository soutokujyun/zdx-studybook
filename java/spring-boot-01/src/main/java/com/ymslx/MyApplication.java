package com.ymslx;

import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.config.Configure;
import com.deepoove.poi.data.Pictures;
import com.deepoove.poi.data.Tables;
import com.deepoove.poi.data.style.BorderStyle;
import com.deepoove.poi.exception.ResolverException;
import com.deepoove.poi.plugin.table.LoopRowTableRenderPolicy;
import com.spire.doc.*;
import com.ymslx.policy.Render2TablePolicy;
import com.ymslx.policy.RenderTablePolicy;
import org.junit.Test;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@SpringBootApplication
public class MyApplication {

    @RequestMapping("/")
    String home() {
        return "Hello World!";
    }
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }

    @Test
    public void getTemplate() throws IOException {
        // 加载模板文件
        ClassPathResource templateFile = new ClassPathResource("resources/static/template.docx");

        File templateFilePath = Paths.get(templateFile.getURI()).toFile();
        String templateDirPath = templateFilePath.getParent();

        // 基于模板目录创建输出文件
        File outputFile = new File(templateDirPath, "generated_" + System.currentTimeMillis() + ".docx");

        try (InputStream inputStream = templateFile.getInputStream();
            FileOutputStream fos = new FileOutputStream(outputFile)) {
            HashMap<String, Object> data = new HashMap<>();
            data.put("title", "Hello POI-TL");
            data.put("table0", Tables.of(new String[][] {
                    new String[] { "00", "01" },
                    new String[] { "10", "11" }
            }).border(BorderStyle.DEFAULT).create());

            // 表格行循环
//            List<Map<String, Object>> products = new ArrayList<>();
//            for (int i = 1; i <= 5; i++) {
//                Map<String, Object> product = new HashMap<>();
//                product.put("count", i);
//                product.put("name", "Product " + i);
//                product.put("price", "$" + (i * 10));
//                products.add(product);
//            }
//            data.put("products", products);

            // 复杂表格循环
//            List<Map<String, Object>> position_left = new ArrayList<>();
//            for (int i = 1; i <= 2; i++) {
//                Map<String, Object> position = new HashMap<>();
//                position.put("point", i);
//                position.put("once", i);
//                position.put("twice", i);
//                position.put("result", i);
//                position_left.add(position);
//            }
//            data.put("position_left", position_left);

            // data
//            LoopRowTableRenderPolicy rowPolicy = new LoopRowTableRenderPolicy();
//            LoopRowTableRenderPolicy rowSamePolicy = new LoopRowTableRenderPolicy(true);

            Configure config = Configure.builder()
//                    .bind("products", rowSamePolicy)
//                    .bind("position_left", rowSamePolicy)
                    .build();
//            动态表格
//            DetailData detailTable = new DetailData();
//            RowRenderData good = Rows.of("4", "墙纸", "书房+卧室", "1500", "/", "400", "1600").center().create();
//            List<RowRenderData> goods = Arrays.asList(good, good, good);
//            RowRenderData labor = Rows.of("油漆工", "2", "200", "400").center().create();
//            List<RowRenderData> labors = Arrays.asList(labor, labor, labor);
//            detailTable.setGoods(goods);
//            detailTable.setLabors(labors);
//            data.put("detail_table", detailTable);
//            DetailTablePolicy detailTablePolicy = new DetailTablePolicy();
//            Configure config = Configure.builder().bind("detail_table", detailTablePolicy).build();

            XWPFTemplate template = XWPFTemplate.compile(inputStream, config).render(data);

            // 输出到新的文件
            template.write(fos);
        }

        System.out.println("Generated file saved to: " + outputFile.getAbsolutePath());
    }

    @Test
    public void getTorqueWrench() throws IOException {
        // 加载模板文件
        ClassPathResource templateFile = new ClassPathResource("resources/static/17-1 扭矩扳子.docx");

        File templateFilePath = Paths.get(templateFile.getURI()).toFile();
        String templateDirPath = templateFilePath.getParent();

        // 基于模板目录创建输出文件
        File outputFile = new File(templateDirPath, "17-1 扭矩扳子 原始记录.docx");

        try (InputStream inputStream = templateFile.getInputStream(); FileOutputStream fos = new FileOutputStream(outputFile)) {
            HashMap<String, Object> data = new HashMap<>();

            data.put("standardNo", "24-10090-206");
            data.put("client", "上海机动车检测认证技术研究中心有限公司");
            data.put("clientAddress", "上海市嘉定区安亭镇于田南路68号");
            data.put("clientNo", "BI20240422040");
            data.put("sampleName", "表盘式扭矩扳子");
            data.put("sampleManufacturer", "CDI");
            data.put("sampleModel", "6002LDIN");
            data.put("sampleNo", "411504192 / 573-356 / JML-238-54");
//            HashMap<String, Object> sampleStatusBefore = new HashMap<>();
//            sampleStatusBefore.put("status", "无异常");

            data.put("sampleStatusBefore", "无异常");
            data.put("sampleContentBefore", "");

//            HashMap<String, Object> sampleStatusAfter = new HashMap<>();
//            sampleStatusBefore.put("status", "异常");
//            sampleStatusBefore.put("content", "无");
            data.put("sampleStatusAfter", "异常");
            data.put("sampleContentAfter", "异常备注");

            data.put("calibrationLocation", "上海汽检总部1-126");
            data.put("temperature", "20.7");
            data.put("humidity", "64.5");
            data.put("atmosphericPressure", "102.1");
            data.put("calibrationOther", "/");
            data.put("calibrationBasis", "JJG 707-2014《扭矩扳子检定规程》");

            // 标准器信息
            List<Map<String, Object>> standardInfos = new ArrayList<>();
            for (int i = 0; i <= 1; i++) {
                Map<String, Object> standardInfo = new HashMap<>();
                standardInfo.put("select", true);
                standardInfo.put("standard", "扭矩扳子检定仪");
                standardInfo.put("equipmentNo", "0321113-850");
                standardInfo.put("uncertainty", "0.3级");
                standardInfo.put("range", "(0.5~5.6)Nm");
                standardInfo.put("certificateNo", "CSSC/GFJGJL1012240000041");
                standardInfo.put("lifespan", "2025/4/29");
                standardInfo.put("useStatusBefore", "无异常");
                standardInfo.put("useContentBefore", "");
                HashMap<String, Object> useAfter = new HashMap<>();
                standardInfo.put("useStatusAfter", "异常");
                standardInfo.put("useContentAfter", "异常备注");

                standardInfos.add(standardInfo);
            }
            data.put("standardInfos", standardInfos);

            data.put("calibratePerson", "朱晟超");
            data.put("verifyPerson", "丁奕");
            data.put("receivingDate", "2025.01.25");
            data.put("calibrateDate", "2025.02.25");
            data.put("clientAddress", "BI20240422040");


            data.put("sampleAppearance", "无异常");

            List<Map<String, Object>> calibrateRecords = new ArrayList<>();
            for (int i = 0; i <= 1; i++) {
                Map<String, Object> calibrateRecord = new HashMap<>();
                calibrateRecord.put("ppn", "10.00");
                calibrateRecord.put("clockwise1", "10.05");
                calibrateRecord.put("clockwise2", "10.09");
                calibrateRecord.put("clockwise3", "10.07");
                calibrateRecord.put("clockwiseAverage", "10.07");
                calibrateRecord.put("clockwiseMpee", "-0.7");
                calibrateRecord.put("clockwiseRpt", "0.4");
                calibrateRecord.put("anticlockwise1", "9.99");
                calibrateRecord.put("anticlockwise2", "9.94");
                calibrateRecord.put("anticlockwise3", "10.01");
                calibrateRecord.put("anticlockwiseAverage", "9.98");
                calibrateRecord.put("anticlockwiseMpee", "0.2");
                calibrateRecord.put("anticlockwiseRpt", "0.7");

                calibrateRecords.add(calibrateRecord);
            }
            data.put("calibrateRecords", calibrateRecords);

            data.put("expandedUncertainty", "Urel=0.8%(k=2)");
            data.put("remark", "1kgf·cm=0.098N·m");

            // data
            LoopRowTableRenderPolicy rowPolicy = new LoopRowTableRenderPolicy();
            LoopRowTableRenderPolicy rowSamePolicy = new LoopRowTableRenderPolicy(true);

            Configure config = Configure.builder()
//                    .bind("products", rowSamePolicy)
                    .bind("standardInfos", rowSamePolicy)
                    .bind("calibrateRecords", rowSamePolicy).build();

            XWPFTemplate template = XWPFTemplate.compile(inputStream, config).render(data);

            // 输出到新的文件
            template.write(fos);
        }

        System.out.println("Generated file saved to: " + outputFile.getAbsolutePath());
    }

    @Test
    public void getDataTemplate() throws IOException {
        // 加载模板文件
        ClassPathResource templateFile = new ClassPathResource("resources/static/template.docx");

        File templateFilePath = Paths.get(templateFile.getURI()).toFile();
        String templateDirPath = templateFilePath.getParent();

        // 基于模板目录创建输出文件
        File outputFile = new File(templateDirPath, "generated_" + System.currentTimeMillis() + ".docx");

        try (InputStream inputStream = templateFile.getInputStream();
             FileOutputStream fos = new FileOutputStream(outputFile)) {
            HashMap<String, Object> data = new HashMap<>();

            data.put("appearance", "符合要求");
            data.put("signs", "符合要求");
            data.put("inspection", "符合要求");

            data.put("alarm", "不正常");

            List<Map<String, Object>> alarmActionValue = new ArrayList<>();
            for (int i = 0; i < 3; i++) {
                HashMap<String, Object> dcVoltage = new HashMap<>();
                dcVoltage.put("gasType", "氢气");
                dcVoltage.put("actionValue", "10");
                dcVoltage.put("unit", "umol/mol");
                alarmActionValue.add(dcVoltage);
            }
            data.put("alarmActionValue", alarmActionValue);

            List<Map<String, Object>> IndicationError1 = new ArrayList<>();
            for (int i = 0; i < 3; i++) {
                HashMap<String, Object> dcVoltage = new HashMap<>();
                dcVoltage.put("concentration", "10");
                dcVoltage.put("average", "10.001");
                dcVoltage.put("indicationError", "0.001");
                IndicationError1.add(dcVoltage);
            }

            data.put("concentrationUnit1", "umol");
            data.put("IndicationError1", IndicationError1);

//            List<Map<String, Object>> dcVoltages = new ArrayList<>();
//            for (int i = 0; i < 3; i++) {
//                HashMap<String, Object> dcVoltage = new HashMap<>();
//                dcVoltage.put("unit", "mV");
//                dcVoltage.put("range", "10");
//                dcVoltage.put("standard", "10.0000");
//                dcVoltage.put("positive", "9.9999");
//                dcVoltage.put("negative", "10.002");
//                dcVoltage.put("uncertainty", "0.001%");
//                dcVoltages.add(dcVoltage);
//            }
//
//            data.put("dcVoltages", dcVoltages);

//            List<Map<String, Object>> acVoltage50Hz = new ArrayList<>();
//            data.put("acVoltage50Hz", acVoltage50Hz);

//            String[][] strs = new String[][]{
//                    {"1.直流电压：", null, null, null},
//                    {"量程", "标准值", "显示值", "扩展不确定度\n（k=2）"},
//                    {"(mV)", "(mV)", "+      (mV)      -", null},
//                    {"100", "10.0000", "9.9999", "0.001%"},
//                    {"100", "10.0000", "9.9999", "0.001%"},
//                    {"100", "10.0000", "9.9999", "0.001%"},
//            };
//            System.out.println("------strs: "+ strs);
////            RowRenderData row1 = Rows.create("没有数据", null, null);
//            MergeCellRule rule = MergeCellRule.builder().map(MergeCellRule.Grid.of(0, 0),MergeCellRule.Grid.of(0, 3))
//                    .map(MergeCellRule.Grid.of(1, 3),MergeCellRule.Grid.of(2, 3))
//                    .build();
//            data.put("dcVoltages", Tables.of(strs).mergeRule(rule).create());

//            DetailTablePolicy detailTablePolicy = new DetailTablePolicy();
//            LoopRowTableRenderPolicy rowPolicy = new LoopRowTableRenderPolicy();
            LoopRowTableRenderPolicy rowSamePolicy = new LoopRowTableRenderPolicy(true);

            Configure config = Configure.builder().useSpringEL(false)
                    .bind("alarmActionValue", rowSamePolicy)
                    .bind("IndicationError1", rowSamePolicy)
//                    .bind("dcVoltages", rowPolicy)
                    .build();

            XWPFTemplate template = XWPFTemplate.compile(inputStream, config).render(data);

            // 输出到新的文件
            template.write(fos);
        } catch (ResolverException  e) {
            e.printStackTrace();
        }

        System.out.println("Generated file saved to: " + outputFile.getAbsolutePath());
    }
    // 表格循环
    @Test
    public void renderTableTemplate() throws IOException {
        // 加载模板文件
        ClassPathResource templateFile = new ClassPathResource("resources/static/render.docx");
        File templateFilePath = Paths.get(templateFile.getURI()).toFile();
        String templateDirPath = templateFilePath.getParent();

        // 基于模板目录创建输出文件
        File outputFile = new File(templateDirPath, "render_" + System.currentTimeMillis() + ".docx");

        try (InputStream inputStream = templateFile.getInputStream(); FileOutputStream fos = new FileOutputStream(outputFile)) {
            HashMap<String, Object> data = new HashMap<>();

            // 标准器具
            List<Map<String, Object>> standards = new ArrayList<>();
            for (int i = 0; i <= 3; i++) {
                HashMap<String, Object> standard = new HashMap<>();
                standard.put("name", "器具" + i);
                standard.put("no", Math.random());
                standard.put("range", "0.001");
                standard.put("uncertainty", "3%");
                standard.put("certificateNo", "209HBW10/3000");
                standards.add(standard);
            }
            data.put("standards", standards);
            Render2TablePolicy render2TablePolicy = new Render2TablePolicy();

            Configure config = Configure.builder().useSpringEL(false)
                    .bind("standards", render2TablePolicy)
                    .build();

            XWPFTemplate template1 = XWPFTemplate.compile(inputStream, config).render(data);
            // 输出到新的文件
            template1.write(fos);
        }
    }

    // 子表格循环
    @Test
    public void renderChildTableTemplate() throws IOException {
        // 加载模板文件
        ClassPathResource templateFile = new ClassPathResource("resources/static/render2.docx");
        File templateFilePath = Paths.get(templateFile.getURI()).toFile();
        String templateDirPath = templateFilePath.getParent();

        // 基于模板目录创建输出文件
        File outputFile = new File(templateDirPath, "render_" + System.currentTimeMillis() + ".docx");

        try (InputStream inputStream = templateFile.getInputStream();
             FileOutputStream fos = new FileOutputStream(outputFile)) {
            HashMap<String, Object> data = new HashMap<>();

            // 标准器具
            List<Map<String, Object>> standards = new ArrayList<>();
            for (int i = 0; i < 3; i++) {
                HashMap<String, Object> standard = new HashMap<>();
                standard.put("name", "器具1");
                standard.put("no", "A00000001");
                standard.put("range", "0.001");
                standard.put("uncertainty", "3%");
                standard.put("certificateNo", "209HBW10/3000");
                standards.add(standard);
            }

//            data.put("standards_0", standards);
//            data.put("standards_1", standards);

            // 数组
            List<Map<String, Object>> standardsKey = new ArrayList<>();
            for (int i = 0; i < 2; i++) {
                HashMap<String, Object> obj = new HashMap<>();
                String key = "standards_" + i;
                obj.put("tableKey", key);
                standardsKey.add(obj);
                data.put(key, standards);
            }
            data.put("standardsKey", standardsKey);

            data.put("img", Pictures.ofUrl("https://www.ymsl.com.cn/shared/img/rwd_identity.png").size(150, 50).create());

            RenderTablePolicy renderTablePolicy = new RenderTablePolicy();

            Configure config = Configure.builder().buildGramer("@list{", "}").useSpringEL(false)
                    .build();

            XWPFTemplate template = XWPFTemplate.compile(inputStream, config).render(data);

            Configure config2 = Configure.builder().useSpringEL(false)
                    .bind("standards_0", renderTablePolicy)
                    .bind("standards_1", renderTablePolicy)
                    .build();

            InputStream inputStream2 = convertToInputStream(template);

            XWPFTemplate template1 = XWPFTemplate.compile(inputStream2, config2).render(data);
            // 输出到新的文件
            template1.write(fos);
        }
    }

    public static InputStream convertToInputStream(XWPFTemplate template) throws IOException {
        // 创建一个ByteArrayOutputStream来保存模板数据
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        // 将模板写入到ByteArrayOutputStream
        template.write(baos);

        // 将ByteArrayOutputStream转换为ByteArrayInputStream
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());

        // 关闭资源
        baos.close();

        return bais;
    }

    @Test
    public void mergeDocTemplate() throws IOException {
        com.spire.license.LicenseProvider.setLicenseKey("XW/hAQAKSOCAiBZF707zP7XXbZSph9Tl1pWLAi8FabOEoQGGnrF5tNeZcne5BeicfqV4LRFHyyGKMSoRxMXfEt0rzjoJ106hILRinTjOz0HIfylCpYoBjgfEw30D7LhXIg5tt0pirxlAwRAzR4dLYbVsJsHVKjfP1A78/ZsmlZ8sPPVHY2lUwdzRvx+UrlQ6Wwmu/1YiIyutH7gRPhIzI2fQBFtc1zbLZ/kuG9CpDFZbrUGDsoN3PUQBOcoKOgFNpY0IhoGteKcGHHo8PcoHaFpXQ8FMRYLBWY7wvjLKLhTsuMvz3HMfAo/dr3TXAI94bBnZh55x/l9hgA/5EREQDaE9/3ykA2v0gB3Yi0jWmQj0KdPhsC9/nmD2sZgMoj4K3cJ59F6KF1pxxxXae+RCZ/Sy74HxEgBYxcMx6+wtIh3gyEy227LOJO1j4wfIJJBk2rC0KV/+JbrT3x8LQuZ9KtC6j7HkI7Y5SPvU0lQac8bD5KQdZ5iTruyUIkTEXhwwLtLSZSi5VpFGWl3QDNinxTapOm3h4JoHVdCyiJmFR7yYM97K2F+/0hwhKK+wTt9dBUFJgYbEGrfR+Dcd+CPKUMBEOnKqIIImfZvaf8qBli42KQYCWSrKK6BXVaz5HvlfFxzsrdbPbtyfB33AeYAWzIVkk4uX+jymBllwUaBH23H3kb18M3fQhGlpsJFU4VCmTz7+S2ce8Jq+kE5meOM8p9PDwJOuq8CfeRBw0jyKUupm4j3IiiiLQxO+R6v9c2ybTbo9xHp6mFOCc4d7rB4hFTemA0TgBNh7m9V642qYBHJK1FFvXVXnJgpC/qyBBilAW0f9FeM+SvYDn7917hB7+6hw4FwdUvNw4oMKQTXy1w5/mLiXJIbhCgZ9h3KbRY7WjXCBYdWLSsp7N4g1yNseO9X5ts5rLvIGpE7z2i04H8s8+dOJJFbaZNia7azdYfmVIYA25W3WiO/jK1ARmhL2l7e9T0VeE/CmO3eZjMudKbexrY3+Q6fij8c9YnHkBi8VKKKYK8RoC9zBq17ksb/w8ca/AZzRyMF4TqgQPWSeWPLWs7B3/WhuARvlrTkJHQngNpMFGGzPm8xEt6XwptxM8JKr7u31Hdeisti3vmhe2wvW22YWP7mayWJjk0EehYFYsW2IMy4Hu+YgsgVpOVs4YKbfDRWfqQbIhmfG3slU510iGoP/iQvCpxqMxmsAaZp2Ipz7Mh3SQGMDKBox/O3m2pQfDqp8st9HOjSeZn+1pYwfueI9EapPu8J0D3UVHJ6TzAwjLt6CZTbRW+QLx9xoMtwIG2qSn4kRrQOOowbjqwfU26jkPKZvv4Wgf3Rxl4sglxvM+WskZJ4Do5sQu8ezAs+h36nfVTG1jBx2CiT4KhDp2YNPU8R03lvzb2VK8MNqh1x8VtVJvacecr72wBfx688jlGR0+wLpzIKpdRXZAUDgG4MbdgHdUU0mch8dCrupXvVqit0Qci1ojKQbAkZJ7LthdulVV3YDG7NYT75H1dVcKpUAU0vJJmef9LMKSC7EADzqg3JA8hkTRsvdQQYHlg==");

        // 优化资源管理，使用 try-with-resources 确保资源正确关闭
        ClassPathResource templateFile1 = new ClassPathResource("resources/static/11封面.docx");
        ClassPathResource templateFile2 = new ClassPathResource("resources/static/12条件.docx");
        ClassPathResource templateFile3 = new ClassPathResource("resources/static/13内容.docx");
        ClassPathResource templateFile4 = new ClassPathResource("resources/static/14声明.docx");

        File templateFilePath = Paths.get(templateFile1.getURI()).toFile();
        String templateDirPath = templateFilePath.getParent();

        // 基于模板目录创建输出文件
        File outputFile = new File(templateDirPath, "render_" + System.currentTimeMillis() + ".docx");

        try (InputStream inputStream1 = templateFile1.getInputStream();
             InputStream inputStream2 = templateFile2.getInputStream();
             InputStream inputStream3 = templateFile3.getInputStream();
             InputStream inputStream4 = templateFile4.getInputStream();
             FileOutputStream fos = new FileOutputStream(outputFile)) {

            Document document1 = new Document(inputStream1);
            Document document2 = new Document(inputStream2);
            Document document3 = new Document(inputStream3);
            Document document4 = new Document(inputStream4);

            // 在第二个文档中循环获取所有节
            for (Section sec : (Iterable<Section>) document2.getSections()) {
                // 在所有节中循环获取所有子对象
                for (DocumentObject obj : (Iterable<DocumentObject>) sec.getBody().getChildObjects()) {
                    // 获取第一个文档的最后一节
                    Section lastSection = document1.getLastSection();
                    // 将所有子对象添加到第一个文档的最后一节中
                    Body body = lastSection.getBody();
                    body.getChildObjects().add(obj.deepClone());
                }
            }

            // 内容
            Section sec3 = document3.getSections().get(0);
            for (DocumentObject obj : (Iterable<DocumentObject>) sec3.getBody().getChildObjects()) {
                // 获取第一个文档的最后一节
                Section lastSection = document1.getLastSection();
                // 将所有子对象添加到第一个文档的最后一节中
                Body body = lastSection.getBody();
                body.getChildObjects().add(obj.deepClone());
            }
//            for (Section sec : (Iterable<Section>) document3.getSections()) {
//                // 在所有节中循环获取所有子对象
//                for (DocumentObject obj : (Iterable<DocumentObject>) sec.getBody().getChildObjects()) {
//                    // 获取第一个文档的最后一节
//                    Section lastSection = document1.getLastSection();
//                    // 将所有子对象添加到第一个文档的最后一节中
//                    Body body = lastSection.getBody();
//                    body.getChildObjects().add(obj.deepClone());
//                }
//                break;
//            }

            for (Section sec : (Iterable<Section>) document4.getSections()) {
                // 在所有节中循环获取所有子对象
                for (DocumentObject obj : (Iterable<DocumentObject>) sec.getBody().getChildObjects()) {
                    // 获取第一个文档的最后一节
                    Section lastSection = document1.getLastSection();
                    // 将所有子对象添加到第一个文档的最后一节中
                    Body body = lastSection.getBody();
                    body.getChildObjects().add(obj.deepClone());
                }
            }

            // 保存结果文档
            document1.saveToFile(fos, FileFormat.Docx_2013);
        } catch (IOException e) {
            System.err.println("文件处理过程中发生错误: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Test
    public void alphabetTemplate() throws IOException {
        // 加载模板文件
        ClassPathResource templateFile = new ClassPathResource("resources/static/template.docx");

        File templateFilePath = Paths.get(templateFile.getURI()).toFile();
        String templateDirPath = templateFilePath.getParent();

        // 基于模板目录创建输出文件
        File outputFile = new File(templateDirPath, "generated_" + System.currentTimeMillis() + ".docx");

        try (InputStream inputStream = templateFile.getInputStream();
             FileOutputStream fos = new FileOutputStream(outputFile)) {
             HashMap<String, Object> data = new HashMap<>();


             String word1 = "\uD835\uDC58";
             String word2 = "\uD835\uDC48";
             String word3 = "\uD835\uDC48ᵣₑₗ";

            // 示例1：纯数学符号
            String mathText = "𝑈ᵣₑₗ";
            data.put("mathVar", MathSymbolFormatter.formatText(word1));

            // 示例2：混合内容
            String mixedText = "变量: 𝑈ᵣₑₗ = 公式值";
            data.put("mixedContent", MathSymbolFormatter.formatMixedContent(word2));

            // 示例3：普通文本
            String normalText = "BI2025N6005030";
            data.put("normalText", MathSymbolFormatter.formatText(normalText));

            // 表格行循环
//            List<Map<String, Object>> products = new ArrayList<>();
//            for (int i = 1; i <= 5; i++) {
//                Map<String, Object> product = new HashMap<>();
//                product.put("count", i);
//                product.put("name", "Product " + i);
//                product.put("price", "$" + (i * 10));
//                products.add(product);
//            }
//            data.put("products", products);

            // data
//            LoopRowTableRenderPolicy rowPolicy = new LoopRowTableRenderPolicy();

            Configure config = Configure.builder()
//                    .bind("products", rowSamePolicy)
                    .build();

            XWPFTemplate template = XWPFTemplate.compile(inputStream, config).render(data);

            // 输出到新的文件
            template.write(fos);
        }

        System.out.println("Generated file saved to: " + outputFile.getAbsolutePath());
    }


}

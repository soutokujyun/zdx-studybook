package com.ymslx.tag.goods.controller;

import com.ymslx.tag.goods.controller.vo.BaseResponse;
import com.ymslx.tag.goods.controller.vo.TagVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.util.List;

@SpringBootTest
public class TagControllerTest {
    @Autowired
    private  TagController tagController;

    @Test
    public void testQueryTagList() {
        BaseResponse listBaseResponse = tagController.queryTagList(null, null);
        Assert.notNull(listBaseResponse, "查询失败");
    }
}

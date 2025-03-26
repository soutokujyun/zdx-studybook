package com.ymslx.tag.goods.controller;

import com.ymslx.tag.goods.controller.vo.BaseResponse;
import com.ymslx.tag.goods.controller.vo.TagVO;
import com.ymslx.tag.goods.entity.TagEntity;
import com.ymslx.tag.goods.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping("/tag")
    public BaseResponse queryTagList(Long tagId, String tagName) {
        BaseResponse successResult = BaseResponse.getSuccessResult(BaseResponse.class);
        List<TagEntity> tagEntities = tagService.queryTagList(tagId, tagName);
        List<TagVO> tagVOS = tagEntities.stream().map(TagVO::transferEntityToVO).collect(Collectors.toList());
        successResult.setData(tagVOS);
        return successResult;
    }
}

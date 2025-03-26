package com.ymslx.tag.goods.service;

import com.ymslx.tag.goods.entity.TagEntity;
import com.ymslx.tag.goods.mapper.TagCustomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    @Autowired
    private TagCustomMapper tagCustomMapper;
    public List<TagEntity> queryTagList(Long tagId, String tagName) {
        return tagCustomMapper.queryTagList(tagId, tagName);
    }
}

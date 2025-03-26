package com.ymslx.tag.goods.mapper;

import com.ymslx.tag.goods.entity.TagEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TagCustomMapper extends TagMapper {
    List<TagEntity> queryTagList(@Param("id") Long id, @Param("name") String name);
}

package com.ymslx.tag.goods.controller.vo;

import com.ymslx.tag.goods.entity.TagEntity;
import lombok.Data;

import java.util.Date;

@Data
public class TagVO extends BaseVO {
    private Long id;
    private String name;
    private String description;
    private Integer status;
    private String style;
    private String expireTime;

    public static TagVO transferEntityToVO(TagEntity tagEntity) {
        TagVO tagVO = new TagVO();
        tagVO.setId(tagEntity.getId());
        tagVO.setName(tagEntity.getName());
        tagVO.setDescription(tagEntity.getDescription());
        tagVO.setStatus(tagEntity.getStatus());
        tagVO.setStyle(tagEntity.getStyle());
        tagVO.setExpireTime(tagEntity.getExpireTime().toString());
        tagVO.setCreateTime(tagEntity.getCreateTime());
        tagVO.setModifyTime(tagEntity.getModifyTime());
        tagVO.setCreator(tagEntity.getCreator());
        tagVO.setModifier(tagEntity.getModifier());
        return tagVO;
    }
}

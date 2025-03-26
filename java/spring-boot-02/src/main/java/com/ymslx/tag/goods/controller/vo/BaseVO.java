package com.ymslx.tag.goods.controller.vo;

import lombok.Data;

import java.util.Date;

@Data
public class BaseVO {
    private  Integer creator;
    private  Integer modifier;
    private  Date createTime;
    private  Date modifyTime;
}

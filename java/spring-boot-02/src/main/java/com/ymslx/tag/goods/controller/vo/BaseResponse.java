package com.ymslx.tag.goods.controller.vo;

import lombok.Data;

@Data
public class BaseResponse<T> {
    private Integer code;
    private String message;
    private T data;

    public static <U extends BaseResponse> U getSuccessResult(Class<U> clazz) {
        try {
            U u = clazz.getDeclaredConstructor().newInstance();
            u.setCode(0);
            u.setMessage("请求成功");
            return u;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static <U extends BaseResponse> U getFailResult(Class<U> clazz) {
        try {
            U u = clazz.getDeclaredConstructor().newInstance();
            u.setCode(1);
            u.setMessage("请求失败");
            return u;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

package com.example.InheritType;

public class Animal {
    // 封装 - 私有化属性
    private String name;
    // 封装 - 私有化属性通过公共方法访问
    protected void setName(String name) {
        this.name = name;
    }

    protected String getName() {
        return this.name;
    }

    public void walk() {
        System.out.println("walk");
    }
    protected void jump()  {
        System.out.println("jump");
    }
}

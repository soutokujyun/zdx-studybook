package com.example.InheritType;

public class Dog extends Animal {
    // 多态 - 方法重载
    public Dog() {
        super();
        this.setName("贵宾犬");
    }
    // 多态 - 方法重载
    public Dog(String name) {
        super.setName(name);
    }

    public void bark()
    {
        System.out.println("Wang Wang Wang");
    }
    // 多态 - 方法重写
    @Override
    public void walk() {
        System.out.println(super.getName() + " is walking");
    }
}

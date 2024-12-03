package com.ymslx.objectproject.sample1;

public class PackageSample03 {
    public static void main(String[] args) {
        // 同一个包下的类无需import导入
        PackageSample01 ps1 = new PackageSample01();
        ps1.name = "包1";
        System.out.println(ps1.getName());
    }
}

package com.ymslx.objectproject.sample2;

import com.ymslx.objectproject.sample1.PackageSample01;

public class PsChild01 extends PackageSample01 {
    public static void main(String[] args)
    {
        PsChild01 ps = new PsChild01();
        ps.name = "子类";
        System.out.println(ps.getName());
    }
}

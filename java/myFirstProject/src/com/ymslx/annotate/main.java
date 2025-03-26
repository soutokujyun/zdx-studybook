package com.ymslx.annotate;

import com.ymslx.description.Description;

public class main {
    public static void main(String[] args)
    {
       sing();
    }
    @Description(desc="sing方法",author="zhangSan",age=18)
    @SuppressWarnings("deprecation")
    public static void sing()
    {
        Children c = new Children();
        c.sing();
    }
}

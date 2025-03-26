package com.ymslx.annotate;

public class Children implements Person {
    @Override
    public String getName() {
        return "";
    }

    @Override
    public int getAge() {
        return 0;
    }

    @Override
    public void sing() {
        System.out.println("Children sing");
    }
}

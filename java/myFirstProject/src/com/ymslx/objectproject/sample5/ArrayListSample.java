package com.ymslx.objectproject.sample5;

import java.util.ArrayList;
import java.util.List;

public class ArrayListSample {
    public static void main(String[] args) {
        List arr = new ArrayList();
        arr.add("hello");
        arr.add(new Integer(1));
        arr.add(new Double(1.1));
        arr.add(new String("world"));
        arr.add(0, "hi");
        System.out.println(arr);

        List arrStr = new ArrayList<String>();
        arrStr.add("hello");
        arrStr.add(1);
        System.out.println(arrStr);
    }
}

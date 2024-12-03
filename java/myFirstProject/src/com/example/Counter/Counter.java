package com.example.Counter;

import java.util.Scanner;

public class Counter {
    public static void main(String[] args) {
        int num = new Scanner(System.in).nextInt();

        while (num < 60) {
            num++;
        }

        System.out.println(num);
    }
}

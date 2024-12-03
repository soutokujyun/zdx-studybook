package com.example.Counter;

import java.util.Scanner;

public class AvageScore {
    public static void main(String[] args) {
        int classNum = 3;
        int studentNum = 4;
        int score = 0;
        int[] scores = { 0, 0, 0, 0 };
        for (int i = 0; i < classNum; i++) {
            score = 0;
            for (int j = 0; j < studentNum; j++) {
                System.out.println("请输入第" + (i + 1) + "班第" + (j + 1) + "个同学的分数");
                score += new Scanner(System.in).nextInt();
            }
            System.out.println("第" + i + "班平均分是：" + (score / studentNum));
        }

    }
}

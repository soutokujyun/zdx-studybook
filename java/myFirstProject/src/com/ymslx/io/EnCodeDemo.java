package com.ymslx.io;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

public class EnCodeDemo {
    public static void main(String[] args) throws UnsupportedEncodingException {
        String s = "哦哦ABC";
        byte[] bytes1 = s.getBytes(); // 默认使用UTF-8编码
        for(byte b:bytes1) {
            // 把字节转换成（int）16进制
            System.out.print(Integer.toHexString(b & 0xff) + " ");
        }
        System.out.println(" ");

        byte[] bytes2 = s.getBytes("gbk");
        // gbk 中文占2个字节，英文占1个字节
        for(byte b:bytes2) {
            System.out.print(Integer.toHexString(b & 0xff) + " ");
        }
        System.out.println(" ");

        byte[] bytes3 = s.getBytes(StandardCharsets.UTF_8);
        // UTF-8 中文占3个字节，英文占1个字节
        for(byte b:bytes3) {
            System.out.print(Integer.toHexString(b & 0xff) + " ");
        }

        System.out.println(" ");
        // JAVA是双字节编码 utf-16be
        byte[] bytes4 = s.getBytes(StandardCharsets.UTF_16BE);
        // UTF-16BE 中文占2个字节，英文占2个字节
        for(byte b:bytes4) {
            System.out.print(Integer.toHexString(b & 0xff) + " ");
        }
    }
}

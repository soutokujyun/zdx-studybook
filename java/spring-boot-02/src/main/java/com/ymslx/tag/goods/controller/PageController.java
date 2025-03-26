package com.ymslx.tag.goods.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
    @RequestMapping("/test")
    public String test(Model model) {
        model.addAttribute("name", "test");
        return "test/test";
    }

    @RequestMapping("/")
    public String main(Model model) {
        model.addAttribute("name", "test");
        return "main/main";
    }
}

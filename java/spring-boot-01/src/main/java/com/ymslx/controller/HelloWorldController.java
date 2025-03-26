package com.ymslx.controller;

import com.ymslx.configuration.StudentConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller
public class HelloWorldController {

    @Autowired
    private StudentConfiguration studentConfiguration;
    @RequestMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @RequestMapping("/student")
    public String getStudentName() {
        return studentConfiguration.getName() + ":" + studentConfiguration.getAge();
    }
}

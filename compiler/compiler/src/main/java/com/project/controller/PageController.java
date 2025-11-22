package com.project.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller  // For HTML pages only
public class PageController {

    @GetMapping("/")
    public String home() {
        // Spring Boot + Thymeleaf will render templates/home.html
        return "home";
    }

    @GetMapping("/about")
    public String about() {
        return "about";  // templates/about.html
    }
}

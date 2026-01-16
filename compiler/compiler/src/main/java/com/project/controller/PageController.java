package com.project.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestParam;


@Controller  // For HTML pages only
public class PageController {

    @GetMapping("/home")
    public String home() {
        // Spring Boot + Thymeleaf will render templates/home.html
        return "home";
    }

    @GetMapping("/login")
    public String login() {
        // Spring Boot + Thymeleaf will render templates/home.html
        return "login";
    }
    @GetMapping("/singin")
    public String sing() {
        // Spring Boot + Thymeleaf will render templates/home.html
        return "singup";
    }
    @GetMapping("/profile")
    public String profile() {
        // Spring Boot + Thymeleaf will render templates/home.html
        return "profile";
    }

     @GetMapping("/compiler")
    public String compiler(@RequestParam int id, Model model) {
        model.addAttribute("id", id); // pass id to template
        return "compiler"; // renders templates/compiler.html
    }
    @GetMapping("/company")
    public String company(@RequestParam int id, Model model) {
        model.addAttribute("id", id); // pass the id to the template
        return "company"; // renders templates/company.html
    }
}

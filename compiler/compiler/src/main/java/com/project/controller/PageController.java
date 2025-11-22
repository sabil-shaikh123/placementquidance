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

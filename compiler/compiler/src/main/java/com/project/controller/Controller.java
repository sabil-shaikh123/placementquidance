package com.project.controller;

import com.project.entity.Code;
import com.project.entity.Company;
import com.project.service.CodeService;
import com.project.service.CompanyCodeService;
import com.project.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//this is the controller which i am making to test the addintion of 2 number
@RestController
@CrossOrigin(
        origins = "*",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
public class Controller {

    @Autowired
    private CodeService codeService;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private CompanyCodeService companyCodeService;

    //to get the details of the specific company
    @GetMapping("/getCompanyById/{id}")
    public Company getCompanyById(@PathVariable int id) {
        return companyService.getCompanyById(id);
    }

    //to get questions related to the specific company
    @GetMapping("/getCompanyQuestion/{id}")
    public List<Code>  getCompanyQuestion(@PathVariable int id){
        return companyCodeService.getCompanyQuestion(id);
    }

    @GetMapping("/getAllCompany")
    public List<Company> getAllcompany(){
        return companyService.getAll();
    }
//    to get the code by the id
    @GetMapping("/getCodeById/{id}")
    public Code getCodeById(@PathVariable int id){
        return codeService.getCode(id);
    }
    @GetMapping("/getAllCode")
    public List<Code> getAllCode(){
        return codeService.getall();
    }
}

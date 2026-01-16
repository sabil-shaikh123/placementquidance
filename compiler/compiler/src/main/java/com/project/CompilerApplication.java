package com.project;

import com.project.entity.Code;
import com.project.entity.Company;
import com.project.entity.CompanyCode;
import com.project.service.CompanyCodeService;
import com.project.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


import java.util.List;

@SpringBootApplication
@EnableScheduling
public class CompilerApplication implements CommandLineRunner {
	@Autowired
	private CompanyService companyService;
	@Autowired
	private CompanyCodeService companyCodeService;

	public static void main(String[] args) {
		SpringApplication.run(CompilerApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {




//		List<Company> companyList = companyService.getAll();
//		System.out.println(companyList);
//		System.out.printf("the company list is \n");
//		for(Company c:companyList){
//			System.out.println(c);
//		}

		List<Code> codeList = companyCodeService.getCompanyQuestion(1);
		System.out.println(codeList);
	}
}

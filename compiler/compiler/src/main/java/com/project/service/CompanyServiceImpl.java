package com.project.service;

import com.project.entity.Company;
import com.project.repo.CompanyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService{

    @Autowired
    private CompanyRepo companyRepo;

    @Override
    public List<Company> getAll() {
        return companyRepo.findAll();
    }

    @Override
    public Company getCompanyById(int id) {
        return companyRepo.findById(id).orElse(null);
    }
}

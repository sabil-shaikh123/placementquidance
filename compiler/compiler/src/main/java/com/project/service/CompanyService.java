package com.project.service;

import com.project.entity.Company;

import java.util.List;

public interface CompanyService {
    List<Company> getAll();
    Company getCompanyById(int id);
}

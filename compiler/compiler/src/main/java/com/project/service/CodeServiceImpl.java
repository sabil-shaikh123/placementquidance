package com.project.service;


import com.project.entity.Code;
import com.project.repo.CodeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CodeServiceImpl implements CodeService {
    @Autowired
    private CodeRepo codeRepo;

    @Override
    public Code getCode(int id) {
        return codeRepo.findById(id).orElse(null);
    }

    @Override
    public List<Code> getall() {
        return codeRepo.findAll();
    }

}

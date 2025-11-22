package com.project.service;
import java.util.List;

import com.project.entity.Code;
import com.project.entity.Company;

public interface CodeService {
    Code getCode(int id);
    List<Code> getall();
}

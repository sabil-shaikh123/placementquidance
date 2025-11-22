package com.project.service;

import com.project.entity.Code;
import com.project.entity.CompanyCode;
import com.project.repo.CompanyCodeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyCodeServiceImpl  implements CompanyCodeService{

    @Autowired
    private CompanyCodeRepo companyCodeRepo;
    @Autowired
    private CodeService codeService;

    @Override
    public List<Code> getCompanyQuestion(int id) {
        List<Code> c1 = new ArrayList<>();
        List<CompanyCode> companyCodes= companyCodeRepo.findByCompanyid(id);

        companyCodes.forEach(companyCode -> {
            int codeid = companyCode.getCodeid();
            if(codeid != 0) {
                c1.add(codeService.getCode(codeid));
            }
        });
        return c1;
    }
}

package com.project.repo;

import com.project.entity.CompanyCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyCodeRepo extends JpaRepository<CompanyCode,Integer> {
    @Query("SELECT c FROM CompanyCode c WHERE c.Companyid = :id")
    List<CompanyCode> findByCompanyid(@Param("id") int id);
}

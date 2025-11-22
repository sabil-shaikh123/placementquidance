package com.project.repo;

import com.project.entity.Code;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.*;

@Repository
public interface CodeRepo extends JpaRepository<Code,Integer> {

}

package com.project.service;

import com.project.entity.Student;

public interface StudentService {
    String addstudent(Student s);
    boolean autenticateUser(String email,String password);
    Student getStudentData(String email);
    String addCompanyToStudent(String email,String companyId,String enab);
}

package com.project.service;

import com.project.entity.Company;
import com.project.entity.Student;
import com.project.repo.CompanyRepo;
import com.project.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentRepo studentRepo;
    @Autowired
    private CompanyRepo companyRepo;

    @Override
    public String addstudent(Student s) {
        Student savedStudent = studentRepo.save(s);

        if (savedStudent != null) {
            return "Student added successfully";
        } else {
            return "Failed to add student";
        }
    }

    @Override
    public boolean autenticateUser(String email, String password) {
        //if the student present in the databsae and the password and email are same then return true
        Student s = studentRepo.findById(email).orElse(null);
        if (s == null) {
            return false; // student not found
        }
        System.out.println(s);
        System.out.println("The password from the db is "+s.getPassword());
        if(s.getEmail().equals(email) && s.getPassword().equals(password)) {
            return true;
        }else{
            return false;
        }
    }

    //to
    @Override
    public Student getStudentData(String email) {
        Student s = studentRepo.findById(email).orElse(null);
        System.out.println(s);
        return s;// student not found
    }

    @Override
    public String addCompanyToStudent(String email, String companyId, String enab) {
        // 1. Fetch student
        Student student = studentRepo.findById(email).orElse(null);
        if(student == null) return "Student email not found";

        // 2. Fetch company
        Company company = companyRepo.findById(Integer.parseInt(companyId)).orElse(null);
        if(company == null) return "company not found";

        if(enab.equals("yes")){
            if(!student.getCompanyList().contains(company)) {
                student.getCompanyList().add(company);
            }

            // 4. Save the student
            studentRepo.save(student);
            return "Company added succesfully";
        }else{
            // 3. Remove the company from the student's companyList
            student.getCompanyList().remove(company);

            // 4. Save the student
            studentRepo.save(student);
            return "Company removed succesfully";
        }

    }
}

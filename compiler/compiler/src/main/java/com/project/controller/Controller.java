package com.project.controller;

import com.project.entity.Code;
import com.project.entity.Company;
import com.project.entity.Student;
import com.project.repo.StudentRepo;
import com.project.service.CodeService;
import com.project.service.CompanyCodeService;
import com.project.service.CompanyService;
import com.project.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

//this is the controller which i am making to test the addintion of 2 number
@RestController
@CrossOrigin(
        origins = "*",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
public class Controller {

    @Autowired
    private CodeService codeService;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private CompanyCodeService companyCodeService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private StudentRepo studentRepo;

    //to get the details of the specific company
    @GetMapping("/getCompanyById/{id}")
    public Company getCompanyById(@PathVariable int id) {
        return companyService.getCompanyById(id);
    }

    //to get questions related to the specific company
    @GetMapping("/getCompanyQuestion/{id}")
    public List<Code>  getCompanyQuestion(@PathVariable int id){
        return companyCodeService.getCompanyQuestion(id);
    }

    @GetMapping("/getAllCompany")
    public List<Company> getAllcompany(){
        return companyService.getAll();
    }
//    to get the code by the id
    @GetMapping("/getCodeById/{id}")
    public Code getCodeById(@PathVariable int id){
        return codeService.getCode(id);
    }
    @GetMapping("/getAllCode")
    public List<Code> getAllCode(){
        return codeService.getall();
    }

    //code to add the student into the database
    @PostMapping("/addStudent")
    public String addStudent(@RequestBody Student s){
        return studentService.addstudent(s);
    }

    //code to authenticate the student
    @PostMapping("/authenticate")
    public boolean authenticate(@RequestBody Map<String, String> data){
        System.out.println("This is the data from the controller"+data);
        return studentService.autenticateUser(data.get("email"),data.get("password"));
    }

    //to get the profile details of the user from db
    @PostMapping("/getProfileData")
    public Student getUserData(@RequestBody Map<String, String> data){
        return studentService.getStudentData(data.get("email"));
    }

    @PostMapping("/addCompanyToStudent")
    public String addCompanyToStudent(@RequestBody Map<String, String> data){
        return studentService.addCompanyToStudent(data.get("email"),data.get("companyId"),data.get("enab"));
    }



    //code to verify and store , this is validate the user by otp
    @Autowired
    private JavaMailSender mailSender;

    private Map<String, Integer> otpStore = new HashMap<>();

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody Map<String, String> data) {
        String email = data.get("email");

        //to check wheather the student already exists or not
        //if student is not eixist then the otp is sent
        if(studentRepo.existsByEmail(email)){
            return "Student already exists";
        }

        int otp = new Random().nextInt(9000) + 1000;

        otpStore.put(email, otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP");
        message.setText("Your OTP is: " + otp);

        mailSender.send(message);

        return "OTP sent successfully";
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> data) {

        String email = data.get("email");
        int enteredOtp = Integer.parseInt(data.get("otp"));

        Integer storedOtp = otpStore.get(email);

        if (storedOtp != null && storedOtp == enteredOtp) {
            otpStore.remove(email); // one-time use
            return "OTP verified";
        }
        return "Invalid OTP";
    }

}

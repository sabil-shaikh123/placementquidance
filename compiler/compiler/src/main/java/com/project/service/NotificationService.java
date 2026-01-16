package com.project.service;

import com.project.entity.Company;
import com.project.entity.Student;
import com.project.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private JavaMailSender mailSender; // Spring Boot email sender

    // Runs every day at 9:00 AM
    @Scheduled(cron = "0 0 9 * * ?")
    public void sendCompanyReminders() {
        LocalDate today = LocalDate.now();
        List<Student> students = studentRepo.findAll();

        for (Student student : students) {
            List<Company> companyList = student.getCompanyList();
            if (companyList == null || companyList.isEmpty()) continue;

            for (Company company : companyList) {
                if (company.getVisiting_date() == null) continue;

                // Convert java.util.Date to LocalDate
                LocalDate visitDate = company.getVisiting_date()
                        .toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate();

                long daysDiff = ChronoUnit.DAYS.between(today, visitDate);

                if (daysDiff == 30 || daysDiff == 1) { // 1 month or 1 day before
                    sendEmail(student.getEmail(), student.getName(), company, daysDiff);
                }
            }
        }
    }

    private void sendEmail(String toEmail, String studentName, Company company, long daysDiff) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);

            String subject = "Prepare for " + company.getCompany_name() + " Placement";
            message.setSubject(subject);

            LocalDate visitDate = company.getVisiting_date()
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();

            String reminderText = (daysDiff == 30) ? "1 month" : "1 day";

            String body = "Hello " + studentName + ",\n\n" +
                    "This is a reminder to prepare for the upcoming placement visit by "
                    + company.getCompany_name() + " scheduled on "
                    + visitDate.format(DateTimeFormatter.ofPattern("dd MMM yyyy")) + ".\n\n" +
                    "This is a " + reminderText + " reminder.\n\n" +
                    "Best regards,\nPlacement Guidance Team";

            message.setText(body);
            mailSender.send(message);

            System.out.println("Email sent to " + toEmail + " for company " + company.getCompany_name() +
                    " (" + reminderText + " reminder)");

        } catch (Exception e) {
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
            e.printStackTrace();
        }
    }
}

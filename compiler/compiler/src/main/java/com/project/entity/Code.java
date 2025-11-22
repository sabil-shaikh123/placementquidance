package com.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString

public class Code {
    @Id
    private int codeId;
    @Column(columnDefinition = "TEXT")
    private String question;
    private String breif_question;
    @Column(columnDefinition = "TEXT")
    private String stdInput;
    @Column(columnDefinition = "TEXT")
    private String stdOutput;
    @Column(columnDefinition = "TEXT")
    private String pythoncode;
    @Column(columnDefinition = "TEXT")
    private String javacode;
    @Column(columnDefinition = "TEXT")
    private String cppcode;
    @Column(columnDefinition = "TEXT")
    private String ccode;
//    @ToString.Exclude
//    @ManyToMany(mappedBy = "codeList")
//    private List<Company> companyList = new ArrayList<>();

}

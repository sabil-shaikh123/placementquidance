package com.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor


public class Company {
    @Id
    private int company_id;
    private String company_name;
    @Column(columnDefinition = "TEXT")
    private String company_description;
//    @ManyToMany(cascade = CascadeType.ALL)
//    private List<Code> codeList= new ArrayList<>();

}

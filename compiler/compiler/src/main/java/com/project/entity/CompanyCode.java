package com.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CompanyCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Companycodeid;
    @Column(nullable = false)
    private int Companyid;
    @Column(nullable = false)
    private int Codeid;
}

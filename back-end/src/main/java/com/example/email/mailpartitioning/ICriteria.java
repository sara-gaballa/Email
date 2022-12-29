package com.example.email.mailpartitioning;

import com.example.email.model.Email;

import java.util.List;

public interface ICriteria {
    List<Email> meetCriteria(List<Email> emails, String criteria);
}

package com.example.email.MailPartitioningManager;

import com.example.email.model.Email;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface ICriteria {
    List<Email> meetCriteria(List<Email> emails, String criteria);
}

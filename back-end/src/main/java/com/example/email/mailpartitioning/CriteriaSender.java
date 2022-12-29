package com.example.email.mailpartitioning;

import com.example.email.model.Email;

import java.util.ArrayList;
import java.util.List;

public class CriteriaSender implements ICriteria {
    @Override
    public List<Email> meetCriteria(List<Email> emails, String sender) {
        List<Email> filteredEmails = new ArrayList<>();
        for (Email email : emails) {
            if (email.getSubject().equalsIgnoreCase(sender)) {
                filteredEmails.add(email);
            }
        }
        return filteredEmails;
    }
}

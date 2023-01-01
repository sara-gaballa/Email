package com.example.email.mailpartitioning;

import com.example.email.model.Email;
import com.example.email.model.EmailKeys;

import java.util.ArrayList;
import java.util.List;

public class CriteriaSubject implements ICriteria {
    @Override
    public List<Email> meetCriteria(List<Email> emails, String subject) {
        List<Email> filteredEmails = new ArrayList<>();
        for (Email email : emails) {
            if (email.search(new String[]{EmailKeys.SUBJECT}, subject)) {
                filteredEmails.add(email);
            }
        }
        return filteredEmails;
    }
}

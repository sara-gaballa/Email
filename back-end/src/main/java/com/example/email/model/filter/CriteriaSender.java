package com.example.email.model.filter;

import com.example.email.model.Email;
import com.example.email.model.EmailKeys;

import java.util.ArrayList;
import java.util.List;

public class CriteriaSender implements ICriteria {
    @Override
    public List<Email> meetCriteria(List<Email> emails, String sender) {
        List<Email> filteredEmails = new ArrayList<>();

        for (Email email : emails) {
            if (email.search(new String[]{EmailKeys.FROM}, sender)) {
                filteredEmails.add(email);
            }
        }
        return filteredEmails;
    }
}

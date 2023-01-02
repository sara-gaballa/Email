package com.example.email.service.utilities;

import com.example.email.model.Email;
import com.example.email.model.comparators.IComparatorFactory;
import com.example.email.model.comparators.MailComparatorFactory;
import com.example.email.model.filter.CriteriaSender;
import com.example.email.model.filter.CriteriaSubject;
import com.example.email.model.filter.ICriteria;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;

public class MailUtility {
    IComparatorFactory comparatorFactory = new MailComparatorFactory();

    ICriteria criteriaSubject = new CriteriaSubject();

    ICriteria criteriaSender = new CriteriaSender();

    public List<Email> filter(String criteria, String value, List<Email> currentEmails) {
        if (criteria.equalsIgnoreCase("subject")) {
            return criteriaSubject.meetCriteria(currentEmails, value);
        } else if (criteria.equalsIgnoreCase("sender")) {
            return criteriaSender.meetCriteria(currentEmails, value);
        }
        return null;
    }

    public List<Email> searchMails(String[] attributes, String value, List<Email> currentEmails) {
        if (currentEmails.isEmpty())// check for empty list to avoid null pointer exception
            return null;
        List<Email> matchEmails = new ArrayList<>();
        for (Email email : currentEmails) {
            if (email.search(attributes, value))
                matchEmails.add(email);
        }
        return matchEmails;
    }

    public List<Email> sort(String attribute, List<Email> currentEmails) {
        Collections.sort(currentEmails, comparatorFactory.getComparator(attribute));
        return currentEmails;
    }

    public PriorityQueue<Email> sortByPriority(List<Email> currentEmails) {
        PriorityQueue que = new PriorityQueue(currentEmails.size(), comparatorFactory.getComparator("priority"));
        for (Email email : currentEmails) {
            que.add(email);
        }
        return que;
    }
}

package com.example.email.utilities;

import com.example.email.comparators.IComparatorFactory;
import com.example.email.comparators.MailComparatorFactory;
import com.example.email.mailpartitioning.CriteriaSender;
import com.example.email.mailpartitioning.CriteriaSubject;
import com.example.email.mailpartitioning.EmailsIterator;
import com.example.email.mailpartitioning.ICriteria;
import com.example.email.model.Email;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;

public class MailUtility {
    IComparatorFactory comparatorFactory = new MailComparatorFactory();

    ICriteria cretiriaSubject = new CriteriaSubject();

    ICriteria cretiriaSender = new CriteriaSender();

    EmailsIterator iterator = new EmailsIterator();

    public List<Email> filter(String criteria, String value, List<Email> currentEmails) {
        List<Email> emails = new ArrayList<>();
        if (criteria.equalsIgnoreCase("subject")) {
            iterator.setAllEmails(cretiriaSubject.meetCriteria(currentEmails, value));
            return iterator.getCurrentPage();
        } else if (criteria.equalsIgnoreCase("sender")) {
            iterator.setAllEmails(cretiriaSender.meetCriteria(currentEmails, value));
            return iterator.getCurrentPage();
        }
        return null;
    }

    public List<Email> pageNavigate(String folder, String direction) {
        if (iterator.hasNextPage() && direction.equalsIgnoreCase("next")) {
            System.out.println("next");
            return iterator.getNextPage();
        } else if (iterator.hasPreviousPage() && direction.equalsIgnoreCase(("Previous"))) {
            System.out.println("previous");
            return iterator.getPreviousPage();
        } else {
            return iterator.getCurrentPage();
        }
//        if(iterator.hasNextPage() && direction.equalsIgnoreCase("next")) {
//            System.out.println("next");
//            return iterator.getNextPage();
//        } else if(iterator.hasPreviousPage() && direction.equalsIgnoreCase(("Previous"))) {
//            System.out.println("previous");
//            return iterator.getPreviousPage();
//        } else{
//            return iterator.getCurrentPage();
//        }
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
        System.out.println(attribute);
        System.out.println(currentEmails.get(0).getBody());

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

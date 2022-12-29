package com.example.email.comparators;

import com.example.email.model.Email;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;

public class MailComparatorFactory implements IComparatorFactory {
    @Override
    public Comparator<Email> getComparator(String attribute) {
        attribute = attribute.toLowerCase();

        switch (attribute) {
            case "sender":
                return new SenderComparator();
            case "receiver":
                return new ReceiversComparator();
            case "date":
                return new DateComparator();
            case "subject":
                return new SubjectComparator();
            case "body":
                return new BodyComparator();
            case "priority":
                return new PriorityComparator();
            case "attachment":
                return new AttachmentComparator();
        }
        return null;
    }
}

class SenderComparator implements Comparator<Email> {
    public int compare(Email email1, Email email2) {
        return email1.getFrom().compareTo(email2.getFrom());
    }
}

class ReceiversComparator implements Comparator<Email> {
    public int compare(Email email1, Email email2) {
        String[] to1 = email1.getTo(), to2 = email2.getTo();
        // compare by number of receivers first
        if (to1.length != to2.length)
            return to1.length - to2.length;
        for (int i = 0; i < to1.length; i++) {
            // if they are equal, compare next ones otherwise compare them
            if (to1[i].equals(to2[i]))
                continue;
            return to1[i].compareTo(to2[i]);
        }
        return 0; // since got out of the loop then they are equal
    }
}

class SubjectComparator implements Comparator<Email> {
    public int compare(Email email1, Email email2) {
        return email1.getSubject().compareTo(email2.getSubject());
    }
}

class BodyComparator implements Comparator<Email> {
    public int compare(Email email1, Email email2) {
        return email1.getBody().compareTo(email2.getBody());
    }
}

class DateComparator implements Comparator<Email> {
    public int compare(Email email1, Email email2) {
        try {
            Date date1 = new SimpleDateFormat("dd-MM-yyyy").parse(email1.getDate());
            Date date2 = new SimpleDateFormat("dd-MM-yyyy").parse(email2.getDate());
            System.out.println(date1);
            System.out.println(date1.compareTo(date2));
            return date1.compareTo(date2);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return 0;// they are equal
    }
}

class TimeComparator implements Comparator<Email> {
    public int compare(Email email1, Email email2) {
        return email1.getBody().compareTo(email2.getBody());
    }
}

class PriorityComparator implements Comparator<Email> {
    public int compare(Email email1, Email email2) {
        return email1.getPriority().compareTo(email2.getPriority());
    }
}

class AttachmentComparator implements Comparator<Email> {
    public int compare(Email email1, Email email2) {
        String[] a1 = email1.getAttachments();
        String[] a2 = email2.getAttachments();
        if (a1.length != a2.length)
            return a1.length - a2.length;
        for (int i = 0; i < a1.length; i++) {
            // if they are equal, compare next ones otherwise compare them
            if (a1[i].equals(a2[i]))
                continue;
            return a1[i].compareTo(a2[i]);
        }
        // since got out of the loop then they are equal
        return 0;
    }
}

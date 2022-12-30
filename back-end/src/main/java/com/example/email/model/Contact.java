package com.example.email.model;

import java.util.List;

public class Contact implements Comparable<Contact> {
    private String name;
    private List<String> emails;

    public Contact(String name, List<String> emails) {
        this.name = name;
        this.emails = emails;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getEmails() {
        return emails;
    }

    public void setEmails(List<String> emails) {
        this.emails = emails;
    }

    public void addEmail(String email) {
        this.emails.add(email);
    }

    public boolean search(String attribute, String value) {
        boolean found = false;
        switch (attribute) {
            case "email":
                for (String email : this.emails)
                    found |= email.toLowerCase().contains(value.toLowerCase());
                break;
            case "name":
                found = this.name.toLowerCase().contains(value.toLowerCase());
                break;
            case "All":
                found = this.name.toLowerCase().contains(value.toLowerCase());
                if (found) break;
                for (String email : this.emails)
                    found |= email.toLowerCase().contains(value.toLowerCase());
                break;
        }
        return found;
    }

    public int compareTo(Contact o) {
        return this.name.compareTo(o.getName());
    }
}

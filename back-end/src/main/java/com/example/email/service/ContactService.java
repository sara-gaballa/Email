package com.example.email.service;

import com.example.email.model.Contact;
import com.example.email.model.User;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ContactService {
    List<Contact> contacts = new ArrayList<>();

    public void addContact(User user, Contact contact) {
        user.addContact(contact);
        this.setContacts(user.getContacts());
    }

    public void editContact(User user, String name, Contact contact) {
        user.setContact(name, contact);
        this.setContacts(user.getContacts());
    }

    public void deleteContact(User user, String name) {
        user.deleteContact(name);
        this.setContacts(user.getContacts());
    }

    public List<Contact> search(String attribute, String value) {
        List<Contact> matchContacts = new ArrayList<>();
        for (Contact contact : this.contacts) {
            if (contact.search(attribute, value))
                matchContacts.add(contact);
        }
        return matchContacts;
    }

    public List<Contact> sort() {
        System.out.println(contacts);
        Collections.sort(this.contacts);
        System.out.println(contacts);
        return this.contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }

    public List<Contact> getContacts() {
        return this.contacts;
    }


}
package com.example.email.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class User {
    private String firstName;
    private String lastName;
    private final String email;
    private String password;
    private List<Contact> contacts;
    private List<String> userFolders = new ArrayList<>();

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contacts = new ArrayList<>();
        
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Contact> getContacts() {
        return contacts;
    }

    public Contact getContact(int index) {
        return contacts.get(index);
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }

    public void addContact(Contact contact) {
        this.contacts.add(contact);
    }

    public String getFolder() {
        return this.email;
    }

    public List<String> getUserFolders() {
        return this.userFolders;
    }

    public void addFolder(String folder) {
        if (this.userFolders.contains(folder))
            throw new RuntimeException("Folder exists");
        this.userFolders.add(folder);
    }

    public void renameFolder(String oldName, String newName) {
        Collections.replaceAll(this.userFolders, oldName, newName);
    }

    public void deleteFolder(String folder) {
        this.userFolders.remove(folder);
    }

}

package com.example.email.service;

import com.example.email.model.User;
import com.example.email.service.mailmanager.FileAdapter;
import com.example.email.service.mailmanager.MailManager;

import java.io.IOException;
import java.util.List;

public class LoggingService implements Logging {
    private List<User> accounts;
    MailManager mailManager = new FileAdapter();

    private User user;

    public LoggingService() throws IOException {
        accounts = mailManager.getUsers();
    }

    @Override
    public void signUp(User user) {
        accounts.add(new User(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword()));
        this.user = user;
    }

    @Override
    public User signIn(String email, String password) {
        this.user = findUser(email);
        return this.user;
    }

    @Override
    public User findUser(String email) {
        for (User account : accounts) {
            if (account.getEmail().equals(email))
                return account;
        }
        return null;
    }

    @Override
    public User getCurrentUser() {
        return this.user;
    }

    @Override
    public void signOut() throws IOException {
        mailManager.addUser(this.user);
        this.user = null;
    }

}

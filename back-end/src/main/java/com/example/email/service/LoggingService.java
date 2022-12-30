package com.example.email.service;

import com.example.email.model.User;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class LoggingService implements Logging {
    private List<User> accounts;
    private User user = new User("Mariam", "Hossam", "m.hossam@galaxy.com", "mariam123");

    public LoggingService() {
        accounts = new ArrayList<>();
    }

    @Override
    public void signUp(User user) throws IOException {
        accounts.add(new User(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword()));
        this.user = user;
    }

    @Override
    public User signIn(String email, String password) {
        accounts.add(this.user);
        //User user = findUser(email);
        //this.user = user;
        return this.user;
    }

    public User findUser(String email) {
        for (User account : accounts) {
            if (account.getEmail().equals(email))
                return account;
        }
        return null;
    }

    public User getCurrentUser() {
        return this.user;
    }

    public User getUser() {
        return user;
    }
}

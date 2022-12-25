package com.example.email.service;

import com.example.email.model.Email;
import com.example.email.model.User;

import java.util.ArrayList;
import java.util.List;

public class LoggingService implements Logging {
    private List<User> accounts;

    public LoggingService() {
        accounts = new ArrayList<>();
    }

    @Override
    public Email[] signUp(User user) {
        accounts.add(user);
        return null;
    }

    @Override
    public Email[] signIn(String email, String password) {
        return null;
    }

    public User findUser(String email) {
        for (User account : accounts) {
            if (account.getEmail().equals(email))
                return account;
        }
        return null;
    }
}

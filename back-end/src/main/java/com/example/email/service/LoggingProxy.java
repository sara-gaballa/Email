package com.example.email.service;

import com.example.email.model.User;

import java.io.IOException;
import java.util.List;

public class LoggingProxy implements Logging {

    private LoggingService service = new LoggingService();

    public LoggingProxy() {
    }

    @Override
    public void signUp(User user) throws IOException {
        if (this.service.findUser(user.getEmail()) != null)
            throw new RuntimeException("Email address already exists!");
        this.service.signUp(user);
    }

    @Override
    public List<String> signIn(String email, String password) {
        User user = this.service.findUser(email);
        if (user == null)
            throw new RuntimeException("Email address not found");
        if (!user.getPassword().equals(password))
            throw new RuntimeException("Incorrect password");
        return this.service.signIn(email, password);
    }
}
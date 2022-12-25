package com.example.email.service;

import com.example.email.model.Email;
import com.example.email.model.User;

public class LoggingProxy implements Logging {
    private LoggingService service;

    public LoggingProxy(LoggingService service) {
        this.service = service;
        //accounts = new ArrayList<>();
    }

    @Override
    public Email[] signUp(User user) {
        if (this.service.findUser(user.getEmail()) != null)
            throw new RuntimeException("Email address already exists!");
        return this.service.signUp(user);
    }

    @Override
    public Email[] signIn(String email, String password) {
        User user = this.service.findUser(email);
        if (user == null)
            throw new RuntimeException("Email address not found");
        if (!user.getPassword().equals(password))
            throw new RuntimeException("Incorrect password");
        return this.service.signIn(email, password);
    }
}

package com.example.email.service;

import com.example.email.model.User;

import java.io.IOException;

public class LoggingProxy implements Logging {

    private LoggingService service = new LoggingService();

    public LoggingProxy() throws IOException {
    }

    @Override
    public void signUp(User user) throws IOException {
        if (this.service.findUser(user.getEmail()) != null)
            throw new RuntimeException("Email address already exists!");
        this.service.signUp(user);
    }

    @Override
    public User signIn(String email, String password) {
        User user = this.service.findUser(email);
        if (user == null)
            throw new RuntimeException("Email address not found");
        if (!user.getPassword().equals(password))
            throw new RuntimeException("Incorrect password");

        return this.service.signIn(email, password);
    }

    @Override
    public User findUser(String email) {
        return service.findUser(email);
    }

    @Override
    public User getCurrentUser() {
        return service.getCurrentUser();
    }

    @Override
    public void signOut() throws IOException {
        service.signOut();
    }
}

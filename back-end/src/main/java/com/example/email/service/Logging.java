package com.example.email.service;

import com.example.email.model.User;

import java.io.IOException;

public interface Logging {
    void signUp(User user) throws IOException;

    User signIn(String email, String password);

    User findUser(String email);

    User getCurrentUser();
}

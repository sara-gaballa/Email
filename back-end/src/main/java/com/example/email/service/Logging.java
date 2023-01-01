package com.example.email.service;

import com.example.email.model.User;

import java.io.IOException;

public interface Logging {
    void signUp(User user);

    User signIn(String email, String password);

    User findUser(String email);

    User getCurrentUser();

    void signOut() throws IOException;
}

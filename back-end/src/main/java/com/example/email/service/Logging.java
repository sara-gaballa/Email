package com.example.email.service;

import com.example.email.model.User;

import java.io.IOException;
import java.util.List;

public interface Logging {
    void signUp(User user) throws IOException;

    List<String> signIn(String email, String password);

    User findUser(String email);
}

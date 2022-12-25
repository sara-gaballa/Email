package com.example.email.service;

import com.example.email.model.User;

import java.io.IOException;
import java.util.List;

public interface Logging {
    public void signUp(User user) throws IOException;

    public List<String> signIn(String email, String password);

}

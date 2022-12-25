package com.example.email.service;

import com.example.email.model.Email;
import com.example.email.model.User;

public interface Logging {
    public Email[] signUp(User user);

    public Email[] signIn(String email, String password);

}

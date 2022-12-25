package com.example.email.mailmanager;

import com.example.email.model.Email;
import com.example.email.model.User;

import java.io.IOException;
import java.util.List;
import java.util.Queue;

public interface Manager {//TODO: write email
    // TODO : get folders on sign in

    // get all emails from inbox folder
    public List<Email> getAllMails(User user) throws IOException;

    // get all emails in specific folder
    public List<Email> getMails(User user, String folder) throws IOException;

    // Check: Queue -> Array
    public boolean sendMail(User user, Email email, Queue<String> toEmail) throws IOException;

    public boolean addMail(String userFolder, Email email, String folder) throws IOException;

    // TODO : add ID
    public boolean deleteMails(String userFolder, String folder, String[] ids) throws IOException;

    public boolean moveMails(String fromFolder, String toFolder, String[] ids);
}

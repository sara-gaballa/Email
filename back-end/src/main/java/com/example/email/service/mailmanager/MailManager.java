package com.example.email.service.mailmanager;

import com.example.email.model.Email;
import com.example.email.model.User;

import java.io.IOException;
import java.util.List;

public interface MailManager {//TODO: write email

    // get all emails in specific folder
    List<Email> getAllMails(String path) throws IOException;

    Email getMail(String path, String id) throws IOException;

    void addMail(String path, String fileName, Email email) throws IOException;

    void deleteMails(String userFolder, String folder, List<String> ids);

    void moveMails(String fromPath, String toPath, List<String> ids);

    List<Email> getCurrentEmails();

    void setCurrentEmails(List<Email> emails);

    void updateTrash(String path, List<String> fileNames);

    void addUser(User user) throws IOException;

    List<User> getUsers() throws IOException;

    void openAttachment(String name) throws IOException;
}

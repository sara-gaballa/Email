package com.example.email.mailmanager;

import com.example.email.model.Email;
import com.example.email.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FileAdapter implements MailManager {
    private static ObjectMapper objectMapper = new ObjectMapper();

    private List<Email> currentEmails = new ArrayList<>();

    // return all mails in specific folder
    @Override
    public List<Email> getAllMails(String path) throws IOException {
        File[] files = FileManager.getAllFiles(path);
        List<Email> emails = new ArrayList<>();
        for (File file : files) {
            emails.add(objectMapper.readValue(file, Email.class));
        }
        this.currentEmails = emails;
        return emails;
    }

    // return one mail with given folder and name
    @Override
    public Email getMail(String path, String name) throws IOException {
        File file = FileManager.getFile(path, name);
        return objectMapper.readValue(file, Email.class);
    }

    // delete all mails with the given named from the given folder
    @Override
    public void deleteMails(String userFolder, String folder, List<String> fileNames) {
        for (int i = 0; i < fileNames.size(); i++) {
            fileNames.set(i, fileNames.get(i).concat(".json"));
        }
        FileManager.deleteFiles(userFolder, folder, fileNames);
    }

    // add mail to the given path
    @Override
    public void addMail(String path, String fileName, Email email) throws IOException {
        File file = FileManager.addFile(path, fileName + ".json");
        //configure objectMapper for pretty input
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);

        //write email object to json file
        objectMapper.writeValue(file, email);
    }

    // move mails from one folder to another
    @Override
    public void moveMails(String fromPath, String toPath, List<String> fileNames) {

        for (int i = 0; i < fileNames.size(); i++) {
            fileNames.set(i, fileNames.get(i).concat(".json"));
        }
        FileManager.moveFiles(fromPath, toPath, fileNames);
    }

    /*//set current folder's name
    @Override
    public void setCurrentFolder(String currentFolder) {
        FileManager.setCurrentFolder(currentFolder);
    }

    //return current folder's name
    @Override
    public String getCurrentFolder() {
        return FileManager.getCurrentFolder();
    }*/

    @Override
    public List<Email> getCurrentEmails() {
        return currentEmails;
    }

    public void setCurrentEmails(List<Email> emails) {
        this.currentEmails = emails;
    }

    @Override
    public void updateTrash(String path, List<String> fileNames) {
        for (int i = 0; i < fileNames.size(); i++) {
            fileNames.set(i, fileNames.get(i).concat(".json"));
        }
        FileManager.deletePermanently(path, fileNames);
    }

    public void addUser(User user) throws IOException {
        File file = FileManager.addFile(FoldersName.ACCOUNTS, user.getEmail() + ".json");
        //configure objectMapper for pretty input
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);

        //write email object to json file
        objectMapper.writeValue(file, user);
    }

    public List<User> getUsers() throws IOException {
        File[] files = FileManager.getAllFiles(FoldersName.ACCOUNTS);
        List<User> users = new ArrayList<>();
        if (files.length == 0) return users; // check for null pointer exception
        for (File file : files) {
            users.add(objectMapper.readValue(file, User.class));
        }
        return users;
    }

}

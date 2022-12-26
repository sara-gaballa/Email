package com.example.email.mailmanager;

import com.example.email.model.Email;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FileAdapter implements MailManager {
    private static ObjectMapper objectMapper = new ObjectMapper();

    // return all mails in specific folder
    @Override
    public List<Email> getAllMails(String path) throws IOException {
        File[] files = FileManager.getAllFiles(path);
        List<Email> emails = new ArrayList<>();
        for (File file : files) {
            emails.add(objectMapper.readValue(file, Email.class));
        }
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
    public void deleteMails(String path, String[] fileNames) {
        for (String name : fileNames) {
            name = name.concat(".json");
        }
        FileManager.deleteFiles(path, fileNames);
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
    public void moveMails(String fromPath, String toPath, String[] fileNames) {
        for (String name : fileNames) {
            name = name.concat(".json");
        }
        FileManager.moveFiles(fromPath, toPath, fileNames);
    }
}

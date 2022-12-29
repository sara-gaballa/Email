package com.example.email.mailmanager;

import com.example.email.model.Email;
import com.example.email.model.Priority;
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
    public List<Email> searchMails(String[] attributes, String value) {
        if (currentEmails.isEmpty())// check for empty list to avoid null pointer exception
            return null;
        List<Email> matchEmails = new ArrayList<>();
        for (Email email : currentEmails) {
            if (email.search(attributes, value))
                matchEmails.add(email);
        }
        return matchEmails;
    }

    @Override
    public List<Email> getCurrentEmails() {
        String[] string = new String[5];
        currentEmails.add(new Email( "Rokii", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Neso", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Sara", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Mariam", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Rokiii", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Nesoo", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Saraa", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Mariamm", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Rokiiii", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Nesooo", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Saraaa", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Mariammm", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Rokiiiii", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Nesoooo", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Saraaaa", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Mariammmm", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Rokiiiiii", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Nesooooo", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Saraaaaa", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Mariammmmm", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Rokiiiiiii", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Nesoooooo", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Saraaaaaa", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        currentEmails.add(new Email( "Mariammmmmm", "SaraNancyMariam", "12/27/2022", "11:50AM", "Project is on fire", "GG", Priority.CRITICAL, string));
        return currentEmails;
    }
}

package com.example.email.service;

import com.example.email.model.Email;
import com.example.email.model.EmailKeys;
import com.example.email.model.User;
import com.example.email.service.mailmanager.FileAdapter;
import com.example.email.service.mailmanager.FileManager;
import com.example.email.service.mailmanager.FoldersName;
import com.example.email.service.mailmanager.MailManager;
import com.example.email.service.utilities.MailUtility;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.JsonSchemaFactory;
import com.networknt.schema.SpecVersion;
import com.networknt.schema.ValidationMessage;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class MailService {
    MailManager mailManager = new FileAdapter();

    MailUtility utility = new MailUtility();


    // sign in / send / add folder / rename folder/ delete folder/ delete mails/ get all mails / move mails
    public List<Email> getAllMails(User user, String folder) throws IOException {
        FileManager.setCurrentFolder(folder);
        System.out.println(user.getFolder().concat("/").concat(folder));
        mailManager.getAllMails(user.getFolder().concat("/").concat(folder));
        List<Email> emails = this.sort(EmailKeys.DATE);
        Collections.reverse(emails);
        mailManager.setCurrentEmails(emails);
        return emails;// return emails sorted by date from newest to oldest
    }

    public void sendMail(Email email, Queue<String> toEmail) throws IOException {
        String id = UUID.randomUUID().toString();
        email.setId(id);
        mailManager.addMail(email.getFrom() + "\\" + FoldersName.SENT, id, email);
        String path = FoldersName.PARENT + "\\" + email.getFrom() + "\\" + FoldersName.SENT + "\\" + id;
        if (!validateMailWithSchema(path))
            return;
        for (String to : toEmail) {
            mailManager.addMail(to + "/" + FoldersName.INBOX, id, email);
        }
    }

    public void deleteMails(User user, String folder, List<String> ids) {
        mailManager.deleteMails(user.getFolder(), folder, ids);
    }

    public void moveMails(User user, String fromFolder, String toFolder, List<String> ids) {
        String fromPath = user.getFolder() + "/" + fromFolder;
        String toPath = user.getFolder() + "/" + toFolder;
        mailManager.moveMails(fromPath, toPath, ids);
    }

    public void openAttachment(String name) throws IOException {
        mailManager.openAttachment(name);
    }

    public void addFolder(User user, String folderName) {
        FileManager.addFolder(user.getFolder() + "/" + folderName);
        user.addFolder(folderName);
    }

    public void renameFolder(User user, String oldName, String newName) {
        FileManager.renameFolder(user.getFolder() + "/" + oldName, user.getFolder() + "/" + newName);
        user.renameFolder(oldName, newName);
    }

    public void deleteFolder(User user, String folderName) {
        FileManager.deleteFolder(user.getFolder() + "/" + folderName);
        user.deleteFolder(folderName);
    }

    public List<Email> search(String[] attributes, String value) {
        mailManager.setCurrentEmails(this.utility.searchMails(attributes, value, mailManager.getCurrentEmails()));
        return mailManager.getCurrentEmails();
    }

    public List<Email> filter(String criteria, String value) {
        mailManager.setCurrentEmails(this.utility.filter(criteria, value, mailManager.getCurrentEmails()));
        return mailManager.getCurrentEmails();
    }


    public List<Email> sort(String attribute) {
        mailManager.setCurrentEmails(this.utility.sort(attribute, mailManager.getCurrentEmails()));
        return mailManager.getCurrentEmails();
    }

    public PriorityQueue<Email> sortByPriority() {
        //TODO : check converting to list or not to set current emails
        return this.utility.sortByPriority(mailManager.getCurrentEmails());
    }

    public void updateTrash(User user) throws IOException, ParseException {
        List<Email> trashEmails = mailManager.getAllMails(user.getFolder() + "\\" + FoldersName.TRASH);
        List<String> deletedIds = new ArrayList<>();
        for (Email email : trashEmails) {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date d1 = new SimpleDateFormat("dd-MM-yyyy").parse(formatter.format(new Date()));
            Date d2 = new SimpleDateFormat("dd-MM-yyyy").parse(email.getDate());
            long diff = d1.getTime() - d2.getTime();
            System.out.println(diff);
            if (diff / (1000 * 60 * 60 * 24) > 30) {
                deletedIds.add(email.getId());
            }
        }
        this.mailManager.updateTrash(user.getFolder() + "\\" + FoldersName.TRASH, deletedIds);
    }

    private boolean validateMailWithSchema(String path) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonSchemaFactory schemaFactory = JsonSchemaFactory.getInstance(SpecVersion.VersionFlag.V201909);
        try {
            InputStream jsonStream = new FileInputStream(path + ".json");
            InputStream schemaStream = new FileInputStream("email_schema.json");
            JsonNode json = objectMapper.readTree(jsonStream);
            JsonSchema schema = schemaFactory.getSchema(schemaStream);
            Set<ValidationMessage> validationResult = schema.validate(json);
            if (validationResult.isEmpty()) {
                System.out.println("There is no validation errors");
                return true;
            } else {
                validationResult.forEach(vm -> System.out.println(vm.getMessage()));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

}

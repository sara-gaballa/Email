package com.example.email.MailPartitioningManager;

import com.example.email.model.Email;

import java.util.List;

public interface IMailIterator {

    boolean hasNextPage();
    List<Email> getNextPage();
    boolean hasPreviousPage();
    List<Email> getPreviousPage();
}

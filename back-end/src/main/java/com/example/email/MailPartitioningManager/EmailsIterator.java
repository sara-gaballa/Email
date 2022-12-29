package com.example.email.MailPartitioningManager;
import com.example.email.model.Email;

import java.util.ArrayList;
import java.util.List;

public class EmailsIterator implements IMailIterator{

    List<Email> allEmails = new ArrayList<>();

    List<Email> currentEmails = new ArrayList<>();

    List<Email> previousEmails = new ArrayList<>();

    List<Email> nextEmails = new ArrayList<>();

    Integer current = 0;

    @Override
    public boolean hasNextPage() {
        if(nextEmails != null) return true;
        else return false;
    }

    @Override
    public List<Email> getNextPage() {
        current += 8;
        previousEmails = currentEmails;
        currentEmails = nextEmails;
        nextEmails = null;
        if(allEmails.size() - current >= 9) {
            for (int i = 0; i < 8; i++) {
                if(current + i < allEmails.size())
                    nextEmails.add(allEmails.get(current + i));
            }
        }
        return currentEmails;
    }

    @Override
    public boolean hasPreviousPage() {
        if(previousEmails != null) return true;
        else return false;
    }

    @Override
    public List<Email> getPreviousPage() {
        current -= 8;
        nextEmails = currentEmails;
        currentEmails = previousEmails;
        previousEmails = null;
        if(current >= 8) {
            for (int i = 7; i >= 0; i--) {
                previousEmails.add(allEmails.get(current - i));
            }
        } else current = 0;
        return currentEmails;
    }

    public List<Email> getCurrentPage() {
        return currentEmails;
    }

    public void setAllEmails(List<Email> allEmails) {
        this.allEmails = allEmails;
        //8 should be parameter
        if(allEmails.size() <= 8) {
            this.currentEmails = allEmails;
        } else {
            for(int i = 0; i < 8; i++) {
                currentEmails.add(allEmails.get(i));
            }
            for(int i = 8; i < 16; i++) {
                if(allEmails.size() > i) {
                    nextEmails.add(allEmails.get(i));
                } else return;
            }
        }
    }
}

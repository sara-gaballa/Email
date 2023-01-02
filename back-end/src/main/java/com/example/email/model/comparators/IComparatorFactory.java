package com.example.email.model.comparators;

import com.example.email.model.Email;

import java.util.Comparator;

public interface IComparatorFactory {
    Comparator<Email> getComparator(String attribute);
}

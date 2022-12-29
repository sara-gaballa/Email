package com.example.email.comparators;

import com.example.email.model.Email;

import java.util.Comparator;

public interface IComparatorFactory {
    Comparator<Email> getComparator(String attribute);
}

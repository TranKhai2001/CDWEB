package com.example.bankend.util;

import java.util.regex.Pattern;

public class ValidationUtil {

    private static final Pattern FULLNAME_REGEX = Pattern.compile("^[a-zA-ZÀ-ỹ\\s]{8,20}$");
    private static final Pattern PHONE_REGEX = Pattern.compile("^\\d{10,15}$");
    private static final Pattern USERNAME_REGEX = Pattern.compile("^[a-zA-Z0-9]{8,16}$");
    private static final Pattern PASSWORD_REGEX = Pattern.compile("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$");

    public static boolean isValidFullName(String fullName) {
        return FULLNAME_REGEX.matcher(fullName).matches();
    }

    public static boolean isValidPhone(String phone) {
        return PHONE_REGEX.matcher(phone).matches();
    }

    public static boolean isValidUsername(String username) {
        return USERNAME_REGEX.matcher(username).matches();
    }

    public static boolean isValidPassword(String password) {
        return PASSWORD_REGEX.matcher(password).matches();
    }
}
package com.uiuc.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class Test {
    public static void main(String[] args) {
        String s= "my string";
        try {
            int count = 6;
            while(count > 0){
                Files.write(Paths.get("C:/Users/dipta/OneDrive/Documents/MCS/CS 410/CourseProject/file-read-api/monitor.txt"),
                        (s+System.lineSeparator()).getBytes(), StandardOpenOption.APPEND);
                count--;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

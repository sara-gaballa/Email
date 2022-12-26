package com.example.email.mailmanager;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;

public class FileManager {
    private final static String parentFolder = "parent";
    private static ObjectMapper objectMapper = new ObjectMapper();

    //create new folder in the given path
    public static boolean addFolder(String path) {
        File folder = new File(parentFolder + "/" + path);
        return folder.mkdirs();
    }

    //delete folder with the given path
    public static boolean deleteFolder(String path) {
        File folder = new File(parentFolder + "/" + path);
        for (File file : folder.listFiles()) {
            // delete files and empty sub-folders
            file.delete();
        }
        return folder.delete();
    }

    //rename folder with the given path
    public static boolean renameFolder(String oldPath, String newPath) {
        File folder = new File(parentFolder + "/" + oldPath);
        return folder.renameTo(new File(parentFolder + "/" + newPath));
    }

    public static File[] getAllFiles(String path) {
        File file = new File(parentFolder + "/" + path);
        return file.listFiles();
    }

    public static File getFile(String path, String name) {
        File file = new File(parentFolder + "/" + path + "/" + name);
        return file;
    }

    // delete files move them to trash folder
    public static void deleteFiles(String path, String[] fileNames) {
        String folder = parentFolder + "/" + path;
        moveFiles(folder, parentFolder + "/" + FoldersName.TRASH, fileNames);
        /*List<File> deletedFiles = new ArrayList<>();
        for (String name : fileNames) {
            File file = new File(folder + "/" + name);
            deletedFiles.add(file);
            file.delete();
        }
        return deletedFiles;*/
    }

    public static File addFile(String path, String fileName) throws IOException {
        addFolder(path);
        File file = new File(parentFolder + "/" + path + "/" + fileName);
        file.createNewFile();
        return file;
    }

    public static File[] moveFiles(String fromPath, String toPath, String[] fileNames) {
        String fromFolder = parentFolder + "/" + fromPath;
        String toFolder = parentFolder + "/" + toPath;
        for (String name : fileNames) {
            File file = new File(fromFolder + "/" + name);
            file.renameTo(new File(toFolder + "/" + name));
        }
        return new File(toFolder).listFiles();
    }

}

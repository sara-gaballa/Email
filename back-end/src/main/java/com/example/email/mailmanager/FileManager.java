package com.example.email.mailmanager;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class FileManager {
    private final static String parentFolder = FoldersName.PARENT;
    private static String currentFolder;

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
        File file = new File(parentFolder + "\\" + path);
        System.out.println(file.toPath());
        return file.listFiles();
    }

    public static File getFile(String path, String name) {
        File file = new File(parentFolder + "/" + path + "/" + name);
        return file;
    }

    // delete files move them to trash folder
    public static void deleteFiles(String userFolder, String mailFolder, List<String> fileNames) {
        moveFiles(userFolder + "\\" + mailFolder, userFolder + "\\" + FoldersName.TRASH, fileNames);
    }

    // used for trash mails which exceeded 30 days
    public static void deletePermanently(String path, List<String> fileNames) {
        for (String name : fileNames) {
            File file = new File(parentFolder + "\\" + path + "\\" + name);
            file.delete();
        }
    }

    public static File addFile(String path, String fileName) throws IOException {
        addFolder(path);
        File file = new File(parentFolder + "/" + path + "/" + fileName);
        file.createNewFile();
        return file;
    }

    public static File[] moveFiles(String fromPath, String toPath, List<String> fileNames) {
        String fromFolder = parentFolder + "\\" + fromPath;
        String toFolder = parentFolder + "\\" + toPath;

        for (String name : fileNames) {
            File file = new File(fromFolder + "\\" + name);
            if (file.renameTo(new File(toFolder + "\\" + name)))
                file.delete();
            else
                System.out.println(toFolder + "\\" + name);
        }
        return new File(toFolder).listFiles();
    }

    public static void setCurrentFolder(String Folder) {
        currentFolder = Folder;
    }

    public static String getCurrentFolder() {
        return currentFolder;
    }

    public static void openFile(String path) throws IOException {
        System.out.println("C:\\Users\\cyber\\Desktop\\email\\back-end\\" + path);
        java.awt.Desktop.getDesktop().open(new File(path));

    }


}

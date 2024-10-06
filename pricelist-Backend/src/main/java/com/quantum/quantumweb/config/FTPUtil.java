package com.quantum.quantumweb.config;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import java.io.IOException;
import java.io.InputStream;

public class FTPUtil {

    public static boolean uploadFile(String server, int port, String user, String pass, String uploadPath, String fileName, InputStream inputStream) {
        FTPClient ftpClient = new FTPClient();
        try {
            ftpClient.connect(server, port);
            ftpClient.login(user, pass);
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            // Create directories if they do not exist
            String[] dirs = uploadPath.split("/");
            String currentDir = "";
            for (String dir : dirs) {
                if (!dir.isEmpty()) {
                    currentDir += "/" + dir;
                    ftpClient.makeDirectory(currentDir);
                }
            }

            // Upload the file
            String remoteFilePath = uploadPath + "/" + fileName;
            return ftpClient.storeFile(remoteFilePath, inputStream);

        } catch (IOException ex) {
            ex.printStackTrace();
            return false;
        } finally {
            try {
                if (ftpClient.isConnected()) {
                    ftpClient.logout();
                    ftpClient.disconnect();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }
}

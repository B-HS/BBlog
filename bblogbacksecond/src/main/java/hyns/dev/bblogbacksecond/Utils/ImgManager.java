package hyns.dev.bblogbacksecond.Utils;

import java.io.File;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ImgManager {
    @Value("${dev.hyns.filepath}")
    private String DIRADRESS;

    public String ImgUpload(MultipartFile file) {
        String fileName = UUID.randomUUID().toString() + "."
                + FilenameUtils.getExtension(file.getOriginalFilename());
        try {
            file.transferTo(new File(DIRADRESS + fileName));
            return fileName;
        } catch (Exception e) {
            return "basic.png";
        }
    }

    public List<Object> ImgRead(String filename) {
        List<Object> result = new ArrayList<>();
        try {
            File file = new File(DIRADRESS + File.separator + URLDecoder.decode(filename, "UTF-8"));
            if (file.exists()) {
                result.add(FileCopyUtils.copyToByteArray(file));
                result.add(Files.probeContentType(file.toPath()));
            }

        } catch (Exception e) {

        }
        return result;
    }
}

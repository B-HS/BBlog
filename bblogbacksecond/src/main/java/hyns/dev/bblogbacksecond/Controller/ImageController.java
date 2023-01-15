package hyns.dev.bblogbacksecond.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hyns.dev.bblogbacksecond.Utils.ImgManager;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ImgManager imageManager;
    @PostMapping(value = "/image/upload")
    public ResponseEntity<String> imageUpload(MultipartFile request) {
        return new ResponseEntity<>(imageManager.ImgUpload(request), HttpStatus.OK);
    }

    @GetMapping(value = "/image/{name}")
    public ResponseEntity<byte[]> imageRead(@PathVariable("name") String name) {
        byte[] file = (byte[]) imageManager.ImgRead(name).get(0);
        return new ResponseEntity<>(file, HttpStatus.OK);
    }
}

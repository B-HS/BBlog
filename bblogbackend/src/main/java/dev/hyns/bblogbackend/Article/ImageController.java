package dev.hyns.bblogbackend.Article;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartRequest;
import lombok.RequiredArgsConstructor;
@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ArticleService aser;
    @PostMapping("/image/upload") public ResponseEntity<String> imageUpload(MultipartRequest files) {return new ResponseEntity<>(aser.ImgUpload(files), HttpStatus.OK);}
    @GetMapping("/image/{name}") public ResponseEntity<byte[]> imageRead(@PathVariable("name") String name) { return new ResponseEntity<>((byte[]) aser.ImgRead(name).get(0), HttpStatus.OK);}
}

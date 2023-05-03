package dev.hyns.bblogbackend.Article.Visit;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import dev.hyns.bblogbackend.Article.Article;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VisitServiceImpl implements VisitService{
    private final VisitRepository vrepo;
    @Override
    public ResponseEntity<Boolean> visit(VisitDTO dto) {
        vrepo.save(Visit.builder().visitUrl(dto.getVisitUrl()).article(Article.builder().aid(dto.getAid()).build()).build());
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}

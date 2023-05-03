package dev.hyns.bblogbackend.Article.Visit;
import org.springframework.http.ResponseEntity;
public interface VisitService { ResponseEntity<Boolean> visit(VisitDTO dto);}

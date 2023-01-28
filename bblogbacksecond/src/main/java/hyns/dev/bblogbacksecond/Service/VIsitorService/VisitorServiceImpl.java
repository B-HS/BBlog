package hyns.dev.bblogbacksecond.Service.VIsitorService;

import org.springframework.stereotype.Service;

import hyns.dev.bblogbacksecond.Entity.Article;
import hyns.dev.bblogbacksecond.Entity.Visitor;
import hyns.dev.bblogbacksecond.Repository.VisitorRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class VisitorServiceImpl implements VisitorService {
    private final VisitorRepository vrepo;

    @Override
    public Boolean postVisit(Long aid, String prev){
        return vrepo.save(Visitor.builder()
                .prevLink(prev)
                .article(Article.builder()
                        .aid(aid).build())
                .build())
                .getVid() > 0
                        ? true
                        : false;
    }
}

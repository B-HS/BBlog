package hyns.dev.bblogbacksecond.Service.ReplyService;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hyns.dev.bblogbacksecond.DTO.MemberDTO;
import hyns.dev.bblogbacksecond.DTO.ReplyDTO;
import hyns.dev.bblogbacksecond.Entity.Reply;
import hyns.dev.bblogbacksecond.Repository.ReplyRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {
    private final ReplyRepository rrepo;
    private final PasswordEncoder encoder;
    @Override
    public HashMap<String, Object> list(Long aid, Integer page, Integer size) {
        HashMap<String, Object> result = new HashMap<>();
        Pageable pageable = PageRequest.of(page, size, Sort.by(Direction.DESC,"replyGroup", "replySort"));
        Page<Reply> entities = rrepo.findDistinctAllByArticleAid(pageable, aid);
        result.put("replies", entities.getContent().stream().map(v -> {
            ReplyDTO tmp = toDTO(v);
            Optional.ofNullable(v.getMember()).ifPresentOrElse(user->{
                tmp.setMember(MemberDTO.builder().nickname(user.getEmail()).mid(user.getMid()).img(user.getImage()).build());
            },()->{
                tmp.setGuestName(v.getGuestName());
            });
            return tmp;
        }).toList());
        result.put("total", entities.getTotalPages());
        return result;
    }

    @Override
    public Long wrtie(ReplyDTO dto) {
        if(dto.getGuestName().length()>0){
            dto.setGuestPassword(encoder.encode(dto.getGuestPassword()));
            return rrepo.save(toEntityGuest(dto)).getRid();
        }
        return null;
    }

    @Override
    public ReplyDTO read(Long num) {
        return null;
    }

    @Override
    public Long modify(ReplyDTO dto) {
        return null;
    }

    @Override
    public Boolean delete(Long num) {
        return null;
    }
}

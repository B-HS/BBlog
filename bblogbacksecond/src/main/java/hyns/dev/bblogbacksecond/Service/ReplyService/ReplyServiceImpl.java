package hyns.dev.bblogbacksecond.Service.ReplyService;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hyns.dev.bblogbacksecond.DTO.MemberDTO;
import hyns.dev.bblogbacksecond.DTO.ReplyDTO;
import hyns.dev.bblogbacksecond.Entity.Reply;
import hyns.dev.bblogbacksecond.Repository.ReplyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {
    private final ReplyRepository rrepo;
    private final PasswordEncoder encoder;

    @Override
    public HashMap<String, Object> list(Long aid, Integer page, Integer size) {
        HashMap<String, Object> result = new HashMap<>();
        Pageable pageable = PageRequest.of(page, size);
        Page<Reply> entities = rrepo
                .findDistinctAllByArticleAidOrderByReplyGroupAscReplySortAscReplyCreatedDateAsc(pageable, aid);
        result.put("replies", entities.getContent().stream().map(v -> {
            ReplyDTO tmp = toDTO(v);
            if (tmp.getHide()) {
                tmp.setContext("비밀 댓글입니다");
            }
            Optional.ofNullable(v.getMember()).ifPresentOrElse(user -> {
                tmp.setMember(
                        MemberDTO.builder().nickname(user.getNickname()).mid(user.getMid()).img(user.getImage())
                                .build());
            }, () -> {
                tmp.setGuestName(v.getGuestName());
            });

            return tmp;
        }).toList());
        result.put("total", entities.getTotalPages());
        return result;
    }

    @Override
    public Long wrtie(ReplyDTO dto, Boolean isUser) {
        if (dto.getReplyGroup() == null) {
            Long latestMid = rrepo.findFirstByArticleAidOrderByRidDesc(dto.getAid())
                    .orElse(Reply.builder().rid(1L).build())
                    .getRid();
            dto.setReplyGroup(latestMid);
        }

        if (!isUser) {
            dto.setGuestPassword(encoder.encode(dto.getGuestPassword()));
            return rrepo.save(toEntityGuest(dto)).getRid();
        }
        return rrepo.save(toEntity(dto)).getRid();
    }

    @Override
    public Long modify(ReplyDTO dto, Boolean isUser) {
        if (isUser) {
            rrepo.findByRidAndMemberMid(dto.getRid(), dto.getMember().getMid()).ifPresentOrElse(v -> {
                v.updateReplyContextForModifyingContext(dto.getContext());
                rrepo.save(v);
            }, () -> dto.setRid(-1L));
        } else {
            rrepo.findById(dto.getRid()).ifPresentOrElse(v -> {
                if (encoder.matches(dto.getGuestPassword(), v.getGuestPassword())) {
                    v.updateReplyContextForModifyingContext(dto.getContext());
                    rrepo.save(v);
                } else {
                    dto.setRid(-1L);
                }

            }, () -> dto.setRid(-1L));
        }
        return dto.getRid();
    }

    @Override
    @Transactional
    public Long delete(ReplyDTO dto, Boolean isUser) {
        if (isUser) {
            rrepo.findByRidAndMemberMid(dto.getRid(), dto.getMember().getMid()).ifPresentOrElse(v -> rrepo.delete(v),
                    () -> dto.setRid(-1L));
        } else {
            rrepo.findById(dto.getRid()).ifPresentOrElse(v -> {
                if (encoder.matches(dto.getGuestPassword(), v.getGuestPassword())) {
                    rrepo.delete(v);
                } else {
                    dto.setRid(-1L);
                }
            }, () -> dto.setRid(-1L));
        }
        return dto.getRid();
    }
}

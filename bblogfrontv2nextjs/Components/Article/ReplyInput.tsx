import React, { useState } from "react";
import { Button, Checkbox, Flex, Image, Input, Textarea, useToast, UseToastOptions } from "@chakra-ui/react";
import useInput from "../../Hook/useInput";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { replyGuestWrite, replyListReuqest, replyUserWrite } from "../../Store/Async/replyAsync";
import { useRouter } from "next/router";
import { getCookie } from "typescript-cookie";
import { decodeJwt } from "../Header/Header";

const ReplyInput = () => {
    const [nickname, nicknameOnChange, setNickname] = useInput();
    const [password, passwordOnChange, setPassword] = useInput();
    const [context, contextOnChange, setContext] = useInput();
    const [hide, setHide] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const toast = useToast();
    const router = useRouter();
    const { member } = useAppSelector((state) => state.member);
    const { slug } = router.query;

    const toastOptions = (desc: string, text?: string) => {
        return {
            description: desc,
            position: "top",
            status: !!text ? text : "error",
            duration: 3000,
            isClosable: true,
        };
    };

    const writeReplyGuest = () => {
        if (nickname.trim().length === 0) {
            toast(toastOptions("닉네임을 입력해주세요") as UseToastOptions);
            return;
        }
        if (password.trim().length === 0) {
            toast(toastOptions("비밀번호를 입력해주세요") as UseToastOptions);
            return;
        }
        if (context.trim().length === 0) {
            toast(toastOptions("내용을 입력해주세요") as UseToastOptions);
            return;
        }

        const replyInfo = {
            context: context,
            guestName: nickname,
            guestPassword: password,
            replySort: 0,
            hide: hide,
            aid: slug,
        };

        dispatch(replyGuestWrite(replyInfo)).then((res) => {
            dispatch(replyListReuqest({ aid: slug, size: res.payload, page: 0 })).then((res) => {
                if (res.payload.total > 0) {
                    window.scrollTo({
                        top:window.innerHeight,
                        left:0,
                        behavior: 'smooth'
                    });
                    setContext("");
                    setNickname("");
                    setPassword("");
                    toast(toastOptions("댓글이 작성되었습니다", "success") as UseToastOptions);
                }
            });
        });
    };

    const writeReplyUser = () => {
        if (context.trim().length === 0) {
            toast(toastOptions("내용을 입력해주세요") as UseToastOptions);
            return;
        }
        const replyInfo = {
            context: context,
            member: {
                mid: decodeJwt(getCookie("access")).userNumber,
                nickname: member.nickname,
            },
            replySort: 0,
            hide: hide,
            aid: slug,
            access: getCookie("access"),
            refresh: getCookie("refresh"),
        };

        dispatch(replyUserWrite(replyInfo)).then((res) => {
            dispatch(replyListReuqest({ aid: slug, size: res.payload, page: 0 })).then((res) => {
                if (res.payload.total > 0) {
                    window.scrollTo({
                        top:window.innerHeight,
                        left:0,
                        behavior: 'smooth'
                    });
                    toast(toastOptions("댓글이 작성되었습니다", "success") as UseToastOptions);
                    setContext("");
                    setNickname("");
                    setPassword("");
                }
            });
        });
    };

    return (
        <Flex borderWidth={1} padding="1.25rem" marginY={"2rem"} flexDirection={"column"} width={"100%"}>
            <Flex alignItems={"center"} gap={5}>
                <Image boxSize="68px" objectFit="cover" src={`${false ? "" : "../favicon.ico"}`} alt={`profile-${"username"}`} alignSelf="flex-start" />
                <Flex flexDirection={"column"} width={"100%"} gap={2}>
                    {!member && (
                        <Flex gap={1} alignItems={"baseline"} className="font-extralight" flexDirection={"column"}>
                            <Input placeholder="닉네임" size="sm" borderRadius={0} value={nickname} onChange={nicknameOnChange} />
                            <Input type={"password"} placeholder="비밀번호" size="sm" borderRadius={0} value={password} onChange={passwordOnChange} />
                        </Flex>
                    )}
                    <Textarea placeholder="내용" borderRadius={0} className="resize-none" value={context} onChange={contextOnChange} />
                    <Flex justifyContent={"flex-end"} className="text-sm text-gray-500 " gap={3}>
                        <Checkbox checked={hide ? true : false} onChange={() => setHide(!hide)}>
                            비밀 댓글
                        </Checkbox>
                        <Button size={"sm"} borderRadius={0} onClick={() => (member ? writeReplyUser() : writeReplyGuest())}>
                            {"댓글 등록"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ReplyInput;

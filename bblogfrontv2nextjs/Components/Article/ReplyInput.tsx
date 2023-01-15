import React, { useState } from "react";
import { Button, Checkbox, Flex, Image, Input, Textarea, useToast, UseToastOptions } from "@chakra-ui/react";
import useInput from "../../Hook/useInput";
import { useAppDispatch } from "../../Store/store";
import { replyGuestWrite, replyListReuqest, replyUserWrite } from "../../Store/Async/replyAsync";
import { useRouter } from "next/router";

const ReplyInput = () => {
    const [nickname, nicknameOnChange] = useInput();
    const [password, passwordOnChange] = useInput();
    const [context, contextOnChange] = useInput();
    const [hide, setHide] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const toast = useToast();
    const router = useRouter();
    const { slug } = router.query;

    const toastOptions = (desc: string) => {
        return {
            description: desc,
            position: "top",
            status: "error",
            duration: 3000,
            isClosable: true,
        };
    };

    const writeReplyGuest = ()=>{
        if(nickname.trim().length===0){
            toast(toastOptions("닉네임을 입력해주세요") as UseToastOptions);
            return
        }
        if(password.trim().length===0){
            toast(toastOptions("비밀번호를 입력해주세요") as UseToastOptions);
            return
        }
        if(context.trim().length===0){
            toast(toastOptions("내용을 입력해주세요") as UseToastOptions);
            return
        }

        const replyInfo = {
            context: context,
            guestName:nickname,
            guestPassword:password,
            hide: hide,
            aid: slug
        }
        dispatch(replyGuestWrite(replyInfo)).then(res=>{
            dispatch(replyListReuqest({aid:slug, size:res.payload, page:0})).then(res=>{
                if(res.payload.total>0){
                    window.scrollTo(0, window.innerHeight);
                }
                
            })
        })
    }

    const writeReplyUser = ()=>{
        if(context.trim().length===0){
            toast(toastOptions("내용을 입력해주세요") as UseToastOptions);
            return
        }

        const replyInfo = {
            context: context,
            member:{
                mid: 0,
                nickname: "HS",
                userimg: "basic.png"
            },
            hide: hide,
            aid: slug

        }

        
        dispatch(replyUserWrite(replyInfo))
        //patch하고 받은 rid로 page:0/size:rid+1로 댓글 페이징
    }

    return (
        <Flex borderWidth={1} padding="1.25rem" marginY={"2rem"} flexDirection={"column"} width={"100%"}>
            <Flex alignItems={"center"} gap={5}>
                <Image boxSize="68px" objectFit="cover" src={`${false?"":"../favicon.ico"}`} alt={`profile-${"username"}`} alignSelf="flex-start" />
                <Flex flexDirection={"column"} width={"100%"} gap={2}>
                    <Flex gap={1} alignItems={"baseline"} className="font-extralight" flexDirection={"column"}>
                        <Input placeholder="닉네임" size="sm" borderRadius={0} value={nickname} onChange={nicknameOnChange}/>
                        <Input placeholder="비밀번호" size="sm" borderRadius={0} value={password} onChange={passwordOnChange}/>
                    </Flex>
                    <Textarea placeholder="내용" borderRadius={0} className="resize-none" value={context} onChange={contextOnChange}/>
                    <Flex justifyContent={"flex-end"} className="text-sm text-gray-500 " gap={3}>
                        <Checkbox checked={hide?true:false} onChange={()=>setHide(!hide)}>비밀 댓글</Checkbox>
                        <Button size={"sm"} borderRadius={0} onClick={()=>false?writeReplyUser():writeReplyGuest()}>
                            {"댓글 등록"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ReplyInput;

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, Flex, Image, Input, InputGroup, InputRightElement, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, useDisclosure, useToast, UseToastOptions } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useRef, useState } from "react";
import { getCookie } from "typescript-cookie";
import useInput from "../../Hook/useInput";
import { replyGuestDelete, replyGuestModify, replyListReuqest, replyUserDelete, replyUserModify } from "../../Store/Async/replyAsync";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { replyInfo } from "../../Typings/type";
import { decodeJwt } from "../Header/Header";

export interface replyProp {
    reply: replyInfo;
}
const ReplyCard = ({ reply }: replyProp) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenPopover, onOpen: onOpenPopover, onClose: onClosePopover } = useDisclosure();
    const { articleDetail } = useAppSelector((state) => state.article);
    const [guestPasswordInput, guestPasswordInputOnChange, setGuestPasswordInput] = useInput();
    const [modifyInput, modifyInputOnChange, setModifyInput] = useInput();
    const cookienum = getCookie("access") ? decodeJwt(getCookie("access")).userNumber : -1;
    const cancelRef = useRef();
    const toast = useToast();
    const dispatch = useAppDispatch();
    dayjs.extend(relativeTime);
    dayjs.locale("ko");

    const toastOptions = (desc: string, stat: string) => {
        return {
            description: desc,
            position: "top",
            status: stat,
            duration: 3000,
            isClosable: true,
        };
    };

    const reloadReply = (res: number, text: string) => {
        if (res === reply.rid) {
            dispatch(replyListReuqest({ aid: articleDetail.aid, page: 0, size: res }));
            toast(toastOptions(`댓글이 ${text}되었습니다`, "success") as UseToastOptions);
        }else{
            toast(toastOptions(`${text}에 실패하였습니다`, "error") as UseToastOptions);
        }
        setGuestPasswordInput("");
        onClose();
    };

    const replyDelete = () => {
        const replyInfo: replyInfo = {
            rid: reply.rid,
            context: "",
            hide: false,
            guestPassword: guestPasswordInput ? guestPasswordInput : "",
            member: {
                mid: getCookie("access") ? decodeJwt(getCookie("access")).userNumber : -1,
                nickname: "",
            },
            access: getCookie("access"),
            refresh: getCookie("refresh"),
        };
        reply.guestName
            ? dispatch(replyGuestDelete(replyInfo)).then((res) => {
                  reloadReply(res.payload, "삭제");
              })
            : dispatch(replyUserDelete(replyInfo)).then((res) => {
                  reloadReply(res.payload, "삭제");
              });
    };

    const replyModify = () => {
        const replyInfo: replyInfo = {
            rid: reply.rid,
            context: modifyInput,
            hide: false,
            guestPassword: guestPasswordInput ? guestPasswordInput : "",
            member: {
                mid: getCookie("access") ? decodeJwt(getCookie("access")).userNumber : -1,
                nickname: "",
            },
            access: getCookie("access"),
            refresh: getCookie("refresh"),
        };
        onClosePopover();
        reply.guestName
            ? dispatch(replyGuestModify(replyInfo)).then((res) => {
                  reloadReply(res.payload, "수정");
              })
            : dispatch(replyUserModify(replyInfo)).then((res) => {
                  reloadReply(res.payload, "수정");
              });
    };

    return (
        <>
            <Flex borderWidth={1} padding="1.25rem" flexDirection={"column"} width={"100%"}>
                <Flex alignItems={"center"} gap={5}>
                    <Image boxSize="60px" objectFit="cover" src={`${reply.member?.userimg ? reply.member.userimg : "../favicon.ico"}`} alt={`profile-${reply.guestName ? reply.guestName : reply.member.nickname}`} alignSelf="flex-start" />
                    <Flex flexDirection={"column"} width={"100%"}>
                        <Flex gap={3} alignItems={"baseline"} className="font-extralight">
                            <span className="text-sm">{reply.guestName ? reply.guestName : reply.member.nickname}</span>
                            <span className="text-xs text-gray-500">{dayjs(reply.replyCreatedDate).locale("ko").fromNow()}</span>
                        </Flex>
                        <span>{reply.context}</span>
                        <Flex gap={2} className="text-sm text-gray-500">
                            <span>{"답글"}</span>
                            {cookienum === reply.member?.mid && (
                                <>
                                    <Popover isOpen={isOpenPopover} onClose={onClosePopover}>
                                        <PopoverTrigger>
                                            <span className="cursor-pointer" onClick={onOpenPopover}>
                                                {reply.hide ? "" : "수정"}
                                            </span>
                                        </PopoverTrigger>
                                        <PopoverContent borderRadius={0}>
                                            <PopoverArrow />
                                            <PopoverCloseButton borderRadius={0} />
                                            <PopoverHeader>현재 내용 : {reply.context}</PopoverHeader>
                                            <PopoverBody>
                                                <Input borderRadius={0} pr="4.5rem" placeholder="수정 내용" value={modifyInput} onChange={modifyInputOnChange} />
                                                {reply.guestName && !getCookie("access") && (
                                                    <InputGroup size="md">
                                                        <Input borderRadius={0} pr="4.5rem" type={ "password"} placeholder="댓글 비밀번호" value={guestPasswordInput} onChange={guestPasswordInputOnChange} />
                                                    </InputGroup>
                                                )}
                                            </PopoverBody>
                                            <PopoverFooter>
                                                <ButtonGroup size="sm" w={"100%"} justifyContent={"flex-end"}>
                                                    <Button borderRadius={0} onClick={onClosePopover}>
                                                        닫기
                                                    </Button>
                                                    <Button borderRadius={0} colorScheme="red" onClick={replyModify}>
                                                        수정
                                                    </Button>
                                                </ButtonGroup>
                                            </PopoverFooter>
                                        </PopoverContent>
                                    </Popover>
                                    <span className="cursor-pointer" onClick={onOpen}>
                                        {"삭제"}
                                    </span>
                                </>
                            )}
                            {reply.guestName && !getCookie("access") && (
                                <>
                                    <Popover isOpen={isOpenPopover} onClose={onClosePopover}>
                                        <PopoverTrigger>
                                            <span className="cursor-pointer" onClick={onOpenPopover}>
                                                {reply.hide ? "" : "수정"}
                                            </span>
                                        </PopoverTrigger>
                                        <PopoverContent borderRadius={0}>
                                            <PopoverArrow />
                                            <PopoverCloseButton borderRadius={0} />
                                            <PopoverHeader>현재 내용 : {reply.context}</PopoverHeader>
                                            <PopoverBody>
                                                <Input borderRadius={0} pr="4.5rem" placeholder="수정 내용" value={modifyInput} onChange={modifyInputOnChange} />
                                                {reply.guestName && !getCookie("access") && (
                                                    <InputGroup size="md">
                                                        <Input borderRadius={0} pr="4.5rem" type={"password"} placeholder="댓글 비밀번호" value={guestPasswordInput} onChange={guestPasswordInputOnChange} />
                                                    </InputGroup>
                                                )}
                                            </PopoverBody>
                                            <PopoverFooter>
                                                <ButtonGroup size="sm" w={"100%"} justifyContent={"flex-end"}>
                                                    <Button borderRadius={0} onClick={onClosePopover}>
                                                        닫기
                                                    </Button>
                                                    <Button borderRadius={0} colorScheme="red" onClick={replyModify}>
                                                        수정
                                                    </Button>
                                                </ButtonGroup>
                                            </PopoverFooter>
                                        </PopoverContent>
                                    </Popover>
                                    <span className="cursor-pointer" onClick={onOpen}>
                                        {"삭제"}
                                    </span>
                                </>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} motionPreset={"none"}>
                <AlertDialogOverlay>
                    <AlertDialogContent borderRadius={0}>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            댓글 삭제
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <span>댓글을 삭제하시겠습니까?</span>
                            {reply.guestName && !getCookie("access") && (
                                <InputGroup size="md">
                                    <Input borderRadius={0} pr="4.5rem" type={"password"} placeholder="댓글 비밀번호" value={guestPasswordInput} onChange={guestPasswordInputOnChange} />
                                </InputGroup>
                            )}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} borderRadius={0}>
                                취소
                            </Button>
                            <Button colorScheme="red" onClick={replyDelete} ml={3} borderRadius={0}>
                                삭제
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};
export default ReplyCard;

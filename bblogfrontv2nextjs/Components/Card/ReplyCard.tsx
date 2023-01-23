import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, Checkbox, Flex, Image, Input, InputGroup, InputRightElement, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, useDisclosure, useToast, UseToastOptions } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useRef, useState } from "react";
import { getCookie } from "typescript-cookie";
import useInput from "../../Hook/useInput";
import { replyGuestDelete, replyGuestModify, replyListReuqest, replyUserDelete, replyUserModify, replyUserWrite, replyGuestWrite } from "../../Store/Async/replyAsync";
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
    const { member } = useAppSelector((state) => state.member);
    const [guestPasswordInput, guestPasswordInputOnChange, setGuestPasswordInput] = useInput();
    const [modifyInput, modifyInputOnChange, setModifyInput] = useInput();
    const [replyNickname, replyNicknameOnChange, setReplyNickname] = useInput();
    const [replyPassword, replyPasswordOnChange, setReplyPassword] = useInput();
    const [replyContext, replyContextOnChange, setReplyContext] = useInput();
    const [replyHide, setReplyHide] = useState<boolean>(false);

    const cookienum = getCookie("access") ? decodeJwt(getCookie("access")).userNumber : -1;
    const cancelRef = useRef();
    const reReplyBox = useRef<HTMLSelectElement>();
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

    const reReplyToggler = () => {
        reReplyBox.current.classList.toggle("max-h-0");
        reReplyBox.current.classList.toggle("mt-3");
    };

    const replyToReply = () => {
        const replyRequest: replyInfo = {
            aid: reply.aid,
            context: replyContext,
            hide: replyHide,
            access: getCookie("access"),
            refresh: getCookie("refresh"),
            member: {
                mid: decodeJwt(getCookie("access")).userNumber,
                nickname: member.nickname,
            },
            guestName: replyNickname,
            guestPassword: replyPassword,
            replySort: reply.replySort + 1,
            replyGroup: reply.replyGroup,
        };

        if (replyRequest.access) {
            if (!replyRequest.context) {
                toast(toastOptions(`내용을 확인해주세요`, "error") as UseToastOptions);
                return;
            }
            dispatch(replyUserWrite(replyRequest)).then(() => {
                dispatch(replyListReuqest({ aid: reply.aid, size: reply.rid + reply.replySort + 1, page: 0 })).then((res) => {
                    if (res.payload.total > 0) {
                        toast(toastOptions("댓글이 작성되었습니다", "success") as UseToastOptions);
                        setReplyContext("");
                        setReplyNickname("");
                        setReplyPassword("");
                    }
                });
            });
            reReplyToggler();
        } else {
            if (replyNickname.trim().length === 0) {
                toast(toastOptions("닉네임을 입력해주세요", "error") as UseToastOptions);
                return;
            }
            if (replyPassword.trim().length === 0) {
                toast(toastOptions("비밀번호를 입력해주세요", "error") as UseToastOptions);
                return;
            }
            if (replyContext.trim().length === 0) {
                toast(toastOptions("내용을 입력해주세요", "error") as UseToastOptions);
                return;
            }

            if (!/^[a-zA-Z0-9]*$/.test(replyPassword)) {
                toast(toastOptions("비밀번호는 영어 또는 숫자만 입력 가능합니다", "error") as UseToastOptions);
                setReplyPassword("");
                return;
            }

            dispatch(replyGuestWrite(replyRequest)).then(() => {
                dispatch(replyListReuqest({ aid: reply.aid, size: reply.rid + reply.replySort + 1, page: 0 })).then((res) => {
                    if (res.payload.total > 0) {
                        window.scrollTo({
                            top: window.innerHeight,
                            left: 0,
                            behavior: "smooth",
                        });
                        toast(toastOptions("댓글이 작성되었습니다", "success") as UseToastOptions);
                        setReplyContext("");
                        setReplyNickname("");
                        setReplyPassword("");
                    }
                });
            });
            reReplyToggler();
        }
    };

    const reloadReply = (res: number, text: string) => {
        if (res === reply.rid) {
            dispatch(replyListReuqest({ aid: articleDetail.aid, page: 0, size: res }));
            toast(toastOptions(`댓글이 ${text}되었습니다`, "success") as UseToastOptions);
        } else {
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
                  setModifyInput("");
                  reloadReply(res.payload, "수정");
              })
            : dispatch(replyUserModify(replyInfo)).then((res) => {
                  setModifyInput("");
                  reloadReply(res.payload, "수정");
              });
    };

    return (
        <>
            <Flex borderWidth={1} borderTopWidth={`${reply.replySort>0?0:1}`} padding="1.25rem" flexDirection={"column"} width={"100%"} className={`${reply.replySort > 0 ? "ml-5" : reply.replyGroup==1?"":"mt-5"}`}>
                <Flex alignItems={"center"} gap={5}>
                    <Image boxSize="60px" objectFit="cover" src={`${reply.member?.userimg ? reply.member.userimg : "../favicon.ico"}`} alt={`profile-${reply.guestName ? reply.guestName : reply.member.nickname}`} alignSelf="flex-start" />
                    <Flex flexDirection={"column"} width={"100%"}>
                        <Flex gap={3} alignItems={"baseline"} className="font-extralight">
                            <span className="text-sm">{reply.guestName ? reply.guestName : reply.member.nickname}</span>
                            <span className="text-xs text-gray-500">{dayjs(reply.replyCreatedDate).locale("ko").fromNow()}</span>
                        </Flex>
                        <span>{reply.context}</span>
                        <Flex gap={2} className="text-sm text-gray-500">
                            {reply.replySort == 0 && (
                                <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                        reReplyToggler();
                                        setReplyContext("");
                                    }}
                                >
                                    {"답글"}
                                </span>
                            )}
                            {cookienum === reply.member?.mid && (
                                <>
                                    <Popover isOpen={isOpenPopover} onClose={onClosePopover}>
                                        {!reply.hide && (
                                            <PopoverTrigger>
                                                <span className="cursor-pointer" onClick={onOpenPopover}>
                                                    {reply.hide ? "" : "수정"}
                                                </span>
                                            </PopoverTrigger>
                                        )}
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
                            {reply.guestName && !getCookie("access") && (
                                <>
                                    <Popover isOpen={isOpenPopover} onClose={onClosePopover}>
                                        {!reply.hide && (
                                            <PopoverTrigger>
                                                <span className="cursor-pointer" onClick={onOpenPopover}>
                                                    {reply.hide ? "" : "수정"}
                                                </span>
                                            </PopoverTrigger>
                                        )}
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
                <Flex w={"100%"}>
                    <section ref={reReplyBox} className="max-h-0 overflow-hidden w-full flex flex-col gap-2">
                        {!getCookie("access") && (
                            <Flex gap={2} w={"35%"}>
                                <Input value={replyNickname} onChange={replyNicknameOnChange} placeholder="닉네임" size={"xs"} type={"text"} borderRadius={0} />
                                <Input value={replyPassword} onChange={replyPasswordOnChange} placeholder="비밀번호" size={"xs"} type={"password"} borderRadius={0} />
                                <Checkbox checked={replyHide ? true : false} onChange={() => setReplyHide(!replyHide)} whiteSpace={"pre"} color={"GrayText"}>
                                    비밀 댓글
                                </Checkbox>
                            </Flex>
                        )}
                        <Input placeholder="내용" size={"sm"} borderRadius={0} value={replyContext} onChange={replyContextOnChange}></Input>
                        <Flex alignSelf={"flex-end"}>
                            <Button size={"sm"} borderRadius={0} bgColor={"transparent"} border={"1px"} borderColor={"gray.300"} onClick={() => replyToReply()}>
                                등록
                            </Button>
                        </Flex>
                    </section>
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

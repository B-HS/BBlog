import useInput from "@/hooks/useInput";
import { Button, Checkbox, Flex, Image, Input, Textarea, useToast, UseToastOptions } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getCookie } from "typescript-cookie";

const CommentInput = () => {
    const [nickname, nicknameOnChange, setNickname] = useInput();
    const [password, passwordOnChange, setPassword] = useInput();
    const [context, contextOnChange, setContext] = useInput();
    const [hide, setHide] = useState<boolean>(false);
    const toast = useToast();
    const router = useRouter();
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

    const commentWrite = () => {
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

        if (!/^[a-zA-Z0-9]*$/.test(password)) {
            toast(toastOptions("비밀번호는 영어 또는 숫자만 입력 가능합니다") as UseToastOptions);
            setPassword("");
            return;
        }
    };

    return (
        <Flex padding="1.25rem" marginY={"2rem"} flexDirection={"column"} width={"100%"}>
            <Flex alignItems={"center"} gap={5}>
                <Image boxSize="68px" objectFit="cover" src={"/favicon.ico"} alt={`profile-${"username"}`} alignSelf="flex-start" />
                <Flex flexDirection={"column"} width={"100%"} gap={2}>
                    <form>
                        <Flex gap={1} alignItems={"baseline"} className="font-extralight" flexDirection={"column"}>
                            <Input className="custom-input" placeholder="닉네임" size="sm" borderRadius={0} value={nickname} onChange={nicknameOnChange} autoComplete="off" />
                            <Input className="custom-input" type={"password"} placeholder="비밀번호" size="sm" borderRadius={0} value={password} onChange={passwordOnChange} autoComplete="off" />
                        </Flex>
                    </form>
                    <Textarea placeholder="내용" border={0} borderRadius={0} className="custom-input resize-none" value={context} onChange={contextOnChange} />
                    <Flex justifyContent={"flex-end"} className="text-sm text-gray-500 " gap={3}>
                        <Checkbox checked={hide ? true : false} onChange={() => setHide(!hide)}>
                            비밀 댓글
                        </Checkbox>
                        <Button size={"sm"} borderRadius={0} onClick={commentWrite}>
                            {"댓글 등록"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CommentInput;

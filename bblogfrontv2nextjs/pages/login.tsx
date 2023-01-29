import { Button, CircularProgress, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import useInput from "../Hook/useInput";
import AXIOS_URL, { OUTER_LINK } from "../Store/Async/axiosConfig/URL";
import { login } from "../Store/Async/memberAsync";
import { useAppDispatch, useAppSelector } from "../Store/store";

const Login = () => {
    const { Loading } = useAppSelector((state) => state.member);
    const [show, setShow] = useState(false);
    const [email, emailOnChange] = useInput();
    const [password, passwordOnChange] = useInput();
    const router = useRouter();
    const handleClick = () => setShow(!show);
    const dispatch = useAppDispatch();
    const memberLogin = () => {
        dispatch(login({ email: email, password: password })).then((res) => {
            if (res.type === "member/login/fulfilled") {
                router.push(`/`);
            }
        });
    };
    return (
        <>
            <Head>
                <title>HS :: Login</title>
                <meta name="description" content="Login page" />
                <meta name="keywords" content="Login" />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content="HS :: Login" />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:description" content="Blog by Hyunseok byun" />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <section className="py-52 flex  flex-col items-center justify-center gap-3">
                <span className="font-bold text-3xl">로그인</span>
                <Stack borderWidth={1} p="2rem">
                    <InputGroup>
                        <InputLeftElement>
                            <BsPersonCircle />
                        </InputLeftElement>
                        <Input placeholder="이메일" borderRadius={0} value={email} onChange={emailOnChange} />
                    </InputGroup>
                    <InputGroup size="md">
                        <InputLeftElement>
                            <BiLockAlt />
                        </InputLeftElement>
                        <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="비밀번호" borderRadius={0} mb="1rem" value={password} onChange={passwordOnChange} />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" borderRadius={0} backgroundColor={"transparent"} color={"gray.300"} onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Flex justify={"space-between"}>
                        <Flex gap={4}>
                            <Link href={`${OUTER_LINK}/oauth/google`}>
                                <img src="https://www.google.com/favicon.ico" alt="google" />
                            </Link>
                        </Flex>
                        <Flex gap={1}>
                            <Button borderRadius={0} borderWidth={1} size={"sm"} onClick={() => router.push("/join")}>
                                회원가입
                            </Button>
                            <Button borderRadius={0} borderWidth={1} size={"sm"} onClick={() => memberLogin()}>
                                로그인
                            </Button>
                        </Flex>
                    </Flex>
                </Stack>
                {Loading && <CircularProgress isIndeterminate color="purple.300" />}
            </section>
        </>
    );
};

export default Login;

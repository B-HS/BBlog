import { Button, CircularProgress, Flex, Input, InputGroup, InputRightElement, Stack, useToast, UseToastOptions } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useInput from "../Hook/useInput";
import { emailAuthCodeRequest, emailAuthProvement, emailDuplicateCheck, join } from "../Store/Async/memberAsync";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { memberJoinAxios } from "../Typings/type";

const Login = () => {
    const { authMailSent, duplicated, Loading, authorized } = useAppSelector((state) => state.member);
    const [show1, setShow1] = useState<boolean>(false);
    const [show2, setShow2] = useState<boolean>(false);
    const [emailInput, emailInputOnChange] = useInput();
    const [nicknameInput, nicknameInputOnChange] = useInput();
    const [passwordInput, passwordInputOnChange] = useInput();
    const [passwordConfirmInput, passwordConfirmInputOnChange] = useInput();
    const [authcodeInput, authcodeInputOnChange] = useInput();
    const toast = useToast();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const toastOptions = (desc: string) => {
        return {
            description: desc,
            position: "top",
            status: "error",
            duration: 3000,
            isClosable: true,
        };
    };
    const memberJoin = () => {
        if (duplicated) {
            toast(toastOptions("이메일 중복체크가 필요합니다") as UseToastOptions);
            return;
        }
        if (!authMailSent) {
            toast(toastOptions("메일 인증 버튼을 눌러 인증을 진행해주세요") as UseToastOptions);
            return;
        }
        if (!authorized) {
            toast(toastOptions("메일 인증 버튼을 눌러 인증을 진행해주세요") as UseToastOptions);
            return;
        }
        if (nicknameInput.trim().length === 0) {
            toast(toastOptions("닉네임을 입력해주세요") as UseToastOptions);
            return;
        }
        if (passwordInput.trim().length === 0 || passwordConfirmInput.trim().length === 0 || passwordConfirmInput !== passwordInput) {
            toast(toastOptions("비밀번호를 입력해주세요") as UseToastOptions);
            return;
        }

        const joinInfo: memberJoinAxios = {
            email: emailInput,
            password: passwordInput,
            nickname: nicknameInput,
        };
        dispatch(join(joinInfo)).then(res=>{
            if(res.payload>0){
                router.push("/login")
            }
        })
    };
    return (
        <section className="py-52 flex  flex-col items-center justify-center gap-3">
            <span className="font-bold text-3xl">회원가입</span>
            <Stack borderWidth={1} p="2rem">
                <InputGroup>
                    <Input placeholder="이메일" borderRadius={0} value={emailInput} onChange={emailInputOnChange} disabled={!duplicated && authMailSent} />
                    <InputRightElement width="4.5rem">
                        {!Loading && duplicated && (
                            <Button
                                h="1.75rem"
                                size="xs"
                                borderRadius={0}
                                backgroundColor={"transparent"}
                                color={"gray.300"}
                                onClick={() => {
                                    dispatch(emailDuplicateCheck(emailInput));
                                }}
                            >
                                중복 확인
                            </Button>
                        )}
                        {!Loading && !duplicated && (
                            <Button
                                h="1.75rem"
                                size="xs"
                                borderRadius={0}
                                backgroundColor={"transparent"}
                                color={"purple1.300"}
                                onClick={() => {
                                    dispatch(emailAuthCodeRequest(emailInput));
                                }}
                            >
                                메일 인증
                            </Button>
                        )}
                        {Loading && <CircularProgress isIndeterminate color="purple.300" />}
                    </InputRightElement>
                </InputGroup>
                {
                    <InputGroup hidden={duplicated && !authMailSent}>
                        <Input placeholder="인증번호" borderRadius={0} disabled={authorized} value={authcodeInput} onChange={authcodeInputOnChange} />
                        <InputRightElement width="4.5rem">
                            <Button
                                h="1.75rem"
                                size="xs"
                                borderRadius={0}
                                backgroundColor={"transparent"}
                                color={"gray.300"}
                                disabled={authorized}
                                onClick={() => {
                                    dispatch(emailAuthProvement({ email: emailInput, authcode: authcodeInput }));
                                }}
                            >
                                인증 확인
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                }
                <InputGroup>
                    <Input placeholder="닉네임" borderRadius={0} value={nicknameInput} onChange={nicknameInputOnChange} />
                </InputGroup>
                <InputGroup size="md">
                    <Input pr="4.5rem" type={show1 ? "text" : "password"} placeholder="비밀번호" borderRadius={0} value={passwordInput} onChange={passwordInputOnChange}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" borderRadius={0} backgroundColor={"transparent"} color={"gray.300"} onClick={() => setShow1(!show1)}>
                            {show1 ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <InputGroup size="md">
                    <Input pr="4.5rem" type={show2 ? "text" : "password"} placeholder="비밀번호 확인" borderRadius={0} mb="1rem" value={passwordConfirmInput} onChange={passwordConfirmInputOnChange}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" borderRadius={0} backgroundColor={"transparent"} color={"gray.300"} onClick={() => setShow2(!show2)}>
                            {show2 ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Flex justify={"flex-end"}>
                    <Button borderRadius={0} borderWidth={1} size={"sm"} onClick={() => memberJoin()}>
                        가입하기
                    </Button>
                </Flex>
            </Stack>
        </section>
    );
};

export default Login;

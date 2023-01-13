import React, { useState } from "react";
import { Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react";
import { BiLockAlt } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    return (
        <section className="py-52 flex items-center justify-center">
            <Stack borderWidth={1} p="2rem">
                <InputGroup>
                    <InputLeftElement>
                        <BsPersonCircle />
                    </InputLeftElement>
                    <Input placeholder="아이디" borderRadius={0} />
                </InputGroup>
                <InputGroup size="md">
                    <InputLeftElement>
                        <BiLockAlt />
                    </InputLeftElement>
                    <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="비밀번호" borderRadius={0} mb="1rem" />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" borderRadius={0} backgroundColor={"transparent"} color={"gray.300"} onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Flex justify={"space-between"}>
                    <Flex gap={4}>
                        <img src="https://www.google.com/favicon.ico" alt="google" />
                        <img src="https://github.githubassets.com/favicons/favicon.svg" alt="github" width="34%" />
                    </Flex>
                    <Button borderRadius={0} borderWidth={1} size={"sm"}>
                        로그인
                    </Button>
                </Flex>
            </Stack>
        </section>
    );
};

export default Login;

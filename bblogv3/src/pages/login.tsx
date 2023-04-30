import { login as userLogin } from "@/ajax/ajax";
import useInput from "@/hooks/useInput";
import { AppDispatch } from "@/store/store";
import { Button, Card, Flex, Input, InputGroup, InputLeftAddon, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const [id, onChangeId] = useInput();
    const [pw, onChangePw] = useInput();
    const toast = useToast();
    const router = useRouter();

    const validator = () => {
        if (!id || id.trim().length === 0) {
            toast({
                title: t("no_id"),
                isClosable: false,
                variant: "subtle",
                status: "warning",
            });
            return false;
        }
        if (!pw || pw.trim().length === 0) {
            toast({
                title: t("no_pw"),
                isClosable: false,
                variant: "subtle",
                status: "warning",
            });
            return false;
        }
        return true;
    };

    const login = () => {
        console.log("1234");
        if (validator()) {
            dispatch(userLogin({ id: id, pw: pw })).then((res) => {
                if (res.payload === "logged") {
                    toast({
                        title: t("login_success"),
                        isClosable: false,
                        variant: "subtle",
                        status: "success",
                    });
                    router.back();
                } else {
                    toast({
                        title: t("login_fail"),
                        isClosable: false,
                        variant: "subtle",
                        status: "error",
                    });
                }
            });
        }
    };

    return (
        <Flex w="full" h="full" alignItems={"center"} justify={"center"} height={"60vh"}>
            <Card width={"35%"} height={"35%"} justify={"center"} align={"center"} gap={5} p={8} shadow={"xl"} minW={"350px"} minH={"300px"} borderRadius={0}>
                <Text fontSize={"2xl"}>{t("login_title")}</Text>
                <form>
                    <InputGroup>
                        <InputLeftAddon className="custom-input-left" borderRight={"1px solid lightgray"} border={0} justifyContent={"center"} w={"30%"} children={t("id")} />
                        <Input type="text" className="custom-input" onChange={onChangeId} />
                    </InputGroup>
                </form>
                <form>
                    <InputGroup>
                        <InputLeftAddon className="custom-input-left" borderRight={"1px solid lightgray"} border={0} justifyContent={"center"} w={"30%"} children={t("pw")} />
                        <Input type="password" className="custom-input" autoComplete="none" onChange={onChangePw} />
                    </InputGroup>
                </form>
                <Flex justify={"end"} w={"full"}>
                    <Button bgColor="transparent" onClick={login}>
                        {t("login_btn")}
                    </Button>
                </Flex>
            </Card>
        </Flex>
    );
};
export default Login;

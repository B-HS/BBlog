import { Button, Card, Flex, Input, InputGroup, InputLeftAddon, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const Login = () => {
    const { t } = useTranslation();
    return (
        <Flex w="full" h="full" alignItems={"center"} justify={"center"} height={"60vh"}>
            <Card width={"35%"} height={"35%"} justify={"center"} align={"center"} gap={5} p={8} shadow={'xl'} minW={"350px"} minH={"300px"} borderRadius={0}>
                <Text fontSize={'2xl'}>{t("login_title")}</Text>
                <InputGroup>
                    <InputLeftAddon borderRight={"1px solid lightgray"} border={0} justifyContent={'center'} w={"30%"} children={t("id")} />
                    <Input variant="filled" type="input" />
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon borderRight={"1px solid lightgray"} border={0} justifyContent={'center'} w={"30%"} children={t("pw")} />
                    <Input variant="filled" type="input" />
                </InputGroup>
                <Flex justify={'end'} w={'full'}>
                    <Button>{t('login_btn')}</Button>
                </Flex>
            </Card>
        </Flex>
    );
};
export default Login;

import { Card, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const Switch = () => {
    const { t, i18n } = useTranslation();
    return (
        <Card className="float-translate" w="46px" h="46px" position={"fixed"} right={5} bottom={20} p={2} borderRadius={1000} opacity={0.8} shadow={"xl"} alignItems={"center"} justify={"center"} onClick={() => i18n.changeLanguage(`${i18n.resolvedLanguage === "ko" ? "jp" : "ko"}`)}>
            <Text cursor={"pointer"} fontSize={"xl"}>
                {i18n.resolvedLanguage === "ko" ? "KR" : "JP"}
            </Text>
        </Card>
    );
};

export default Switch;

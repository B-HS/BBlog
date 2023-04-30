import { Flex } from "@chakra-ui/react";
import { t } from "i18next";
import { useEffect } from "react";
import { Cookies } from "typescript-cookie";

const Logout = () => {
    useEffect(() => {
        Cookies.remove("token");
        const interval = setTimeout(() => history.back(), 1500);
        return () => clearInterval(interval);
    }, []);
    return (
        <Flex direction={"column"} alignItems={"center"}>
            <img className="seyana w-[50%] max-w-[500px] min-w-[350px]" src="/v1/image/default.png" alt="" />
            <span className="btn btn-sm">{t("logout_done")}</span>
            <span className="btn btn-sm">{t("go_back_soon")}</span>
        </Flex>
    );
};

export default Logout;

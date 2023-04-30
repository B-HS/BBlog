import { Card, Text, useColorMode } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

const Theme = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Card className="float-theme" w="46px" h="46px" position={"fixed"} right={5} bottom={5} p={2} borderRadius={1000}  opacity={0.8} shadow={'xl'} alignItems={'center'} justify={'center'} zIndex={100000}>
            <Text cursor={"pointer"} onClick={toggleColorMode} fontSize={"3xl"}>
                {colorMode === "dark" ? <Icon icon="material-symbols:clear-night" className="-translate-y-0.5" /> : <Icon icon="material-symbols:clear-day" />}
            </Text>
        </Card>
    );
};

export default Theme;

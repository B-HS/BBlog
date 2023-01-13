import { Flex } from "@chakra-ui/react";

const NotFound = () => {
    return (
        <>
            <Flex className="w-100 h-screen" flexDirection={"column"} alignItems={"center"} mt={`${window.innerHeight / 3}px`} gap={2}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
                    <path fill="#FFA500" d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z" />
                </svg>
                <span>페이지가 존재하지 않습니다</span>
                <br />
                <span>현재 페이지 : /{decodeURIComponent(window.location.href.split("/")[3])}</span>
            </Flex>
        </>
    );
};

export default NotFound;

import { article } from "@/app";
import { Box, Flex } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import dayjs from "dayjs";
import dompurify from "isomorphic-dompurify";
import Head from "next/head";

export async function getStaticProps() {
    const { data } = await axios.post("https://hyns.dev/v1/article/list", { aid: -1, menu: "INTRO" });
    const { article } = data;

    return {
        props: { props: { article } }, // will be passed to the page component as props
    };
}

interface homeProps {
    props: { article: article };
}

const Home = ({ props }: homeProps) => {
    const sanitizer = dompurify.sanitize;
    return (
        <>
            <Head>
                <title>HS :: Intro</title>
                <meta name="description" content={`${props.article.context.replace(/<[^>]+>/g, "")}`} />
                <meta name="keywords" content="Developer homepage, Intropage, Resume" />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content="HS :: Intro" />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:description" content={`${props.article.context.replace(/<[^>]+>/g, "")}`} />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <Box className="" borderWidth="1px" borderColor={'#303030'} p={3} mt={5}>
                <Flex direction={"column"} gap={3}>
                    <Flex alignItems={"center"} gap={1}>
                        <Icon icon="uil:calender" />
                        <span className="text-sm text-gray-500 translate-y-[0.5px]">{dayjs(props.article.createdDate).locale("ko").format("YYYY년 MM월 DD일")}</span>
                    </Flex>
                    <div dangerouslySetInnerHTML={{ __html: sanitizer(props.article.context) }}></div>
                </Flex>
            </Box>
        </>
    );
};

export default Home;

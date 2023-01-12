import { Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { BiCalendar, BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import Tag from "./Tag";

const ArticleCard = () => {
    const tmpTag = ["1234", "32415"];
    return (
        <>
            <Card className="card" direction={{ base: "column", sm: "row" }} variant="outline" borderRadius="0">
                <Link to={`/read/${Math.random() * 10000}`}>
                    <Image objectFit="cover" height={"100%"} maxH={"300px"} maxW={{ base: "100%", sm: "250px" }} src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" alt="Caffe Latte" />
                </Link>
                <Stack>
                    <CardBody>
                        <section className="menu flex items-center text-gray-500">
                            <BiMenu />
                            <Text fontSize="small">Menu</Text>
                        </section>
                        <Link to={`/read/${Math.random() * 10000}`}>
                            <Heading size="lg">Title section </Heading>
                        </Link>
                        <section className="date flex items-center text-gray-500">
                            <BiCalendar />
                            <Text fontSize="small" color="gray.500">
                                2023.01.01
                            </Text>
                        </section>
                        <Text py="2">60자로 줄여서 출력</Text>
                    </CardBody>
                    <CardFooter flexDirection="row" gap="0.5rem">
                        <Tag tagName={tmpTag} />
                    </CardFooter>
                </Stack>
            </Card>
        </>
    );
};

export default ArticleCard;

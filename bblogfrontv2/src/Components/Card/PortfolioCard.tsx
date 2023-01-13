import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { BiCalendar } from "react-icons/bi";
import { Link } from "react-router-dom";
import Tag from "./Tag";

const PortfolioCard = () => {
    const tmpTag = ["1234", "32415"];
    return (
        <>
            <Card className="card" borderRadius={0}>
                <CardBody>
                    <Link to={`/portfolio/${Math.random() * 10000}`}>
                        <Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="Green double couch with wooden legs" borderRadius="0" />
                    </Link>
                    <Stack mt="6" spacing="3">
                        <section className="date flex items-center text-gray-500">
                            <BiCalendar />
                            <Text fontSize="small" color="gray.500">
                                2023.01.01
                            </Text>
                        </section>
                        <Link to={`/portfolio/${Math.random() * 10000}`}>
                            <Heading size="md">ProjectName</Heading>
                        </Link>
                        <Text>250자 내로 작성해서 출력</Text>
                    </Stack>
                    <section className="stack">
                        <Tag tagName={tmpTag} />
                    </section>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing="2">
                        <Button variant="solid" colorScheme="blackAlpha" borderRadius={0}>
                            깃허브로 이동
                        </Button>
                        <Button variant="solid" colorScheme="telegram" borderRadius={0}>
                            배포 사이트로 이동
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>
    );
};

export default PortfolioCard;

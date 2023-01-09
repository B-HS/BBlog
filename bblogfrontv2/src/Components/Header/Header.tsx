import { Input, Tooltip } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { BsBootstrap, BsBoxArrowRight, BsFillFileTextFill, BsGithub, BsSearch } from "react-icons/bs";
import Menubar from "./Menubar";

export const Header = () => {
    const [scrollWith, setScrollWith] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const openMenu = () => setIsOpen(!isOpen);

    const scrollbar = useCallback(() => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setScrollWith((winScroll / height) * 100);
        console.log(scrollWith);
    }, [scrollWith]);
    const calcWith = useCallback(() => {
        return setWindowWidth(window.innerWidth);
    }, [windowWidth]);
    useEffect(() => calcWith, []);

    window.onscroll = () => scrollbar();
    window.onresize = () => calcWith();
    return (
        <>
            <div className="w-screen h-12 bg-black px-7 text-white flex items-center justify-between sticky top-0 text-lg flex-wrap min-w-[425px]">
                <div className="flex main items-center w-1/3 gap-2">
                    <BiMenu onClick={openMenu} />
                    <span>Hyunseok</span>
                </div>
                {windowWidth >= 425 && (
                    <div className="search_section flex items-center w-1/3 gap-3 justify-center">
                        <BsSearch />
                        <Input padding={"0.25rem"} variant={"unstyled"} overflow={"hidden"} />
                    </div>
                )}
                <div className="navigator flex items-center w-1/3 justify-end gap-7">
                    <a href="https://github.com/B-HS">
                        <Tooltip label="깃허브" aria-label="gibhub" hasArrow arrowSize={10}>
                            <span>
                                <BsGithub />
                            </span>
                        </Tooltip>
                    </a>
                    <a href="https://hbyun.tistory.com/">
                        <Tooltip label="티스토리" aria-label="tistory" hasArrow arrowSize={10}>
                            <span>
                                <BsBootstrap />
                            </span>
                        </Tooltip>
                    </a>
                    <a href="https://portfolio.hyns.co.kr/">
                        <Tooltip label="포트폴리오" aria-label="portfolio" hasArrow arrowSize={10}>
                            <span>
                                <BsFillFileTextFill />
                            </span>
                        </Tooltip>
                    </a>
                    <a href="./login">
                        <Tooltip label="로그인" aria-label="login" hasArrow arrowSize={10}>
                            <span>
                                <BsBoxArrowRight />
                            </span>
                        </Tooltip>
                    </a>
                </div>
            </div>
            <div className="bg-white z-50 h-1 fixed top-1" style={{ width: `${scrollWith}%` }}></div>
            {Menubar(isOpen, openMenu)}
        </>
    );
};

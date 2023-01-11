import { Tooltip } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsBoxArrowRight, BsGithub } from "react-icons/bs";
import { TbLetterT } from "react-icons/tb";
import { Link } from "react-router-dom";

export const Header = () => {
    const [scrollWith, setScrollWith] = useState<number>(0);
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [currentLocation, setCurrentLocation] = useState<string>("");
    const verticalscroll = useRef<HTMLDivElement>(null);

    const scrollbar = useCallback(() => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setScrollWith((winScroll / height) * 100);
    }, [scrollWith]);
    const calcWith = useCallback(() => {
        return setWindowWidth(window.innerWidth);
    }, [windowWidth]);
    const fillColorMenu = useCallback(() => {
        return setCurrentLocation(window.location.href.split("/")[3]);
    }, [currentLocation]);

    const resetStatus = (name: string) => {
        window.scrollTo(0, 0);
        setScrollWith(0);
        setCurrentLocation(name);
    };

    useEffect(() => calcWith, []);
    useEffect(() => fillColorMenu, []);

    window.onscroll = () => scrollbar();
    window.onresize = () => calcWith();
    window.addEventListener("popstate", () => {
        setCurrentLocation(window.location.href.split("/")[3]);
    });

    return (
        <>
            <div className="header h-12 mx-[0.07rem] bg-white bg-opacity-50 text-black flex items-baseline justify-between sticky top-0 gap-2 text-lg z-50 transition ease-in-out duration-200 hover:bg-opacity-100 pt-2 px-3 border-b">
                <div className="main flex items-baseline gap-2">
                    <Link to="/">
                        <span className="text-2xl" onClick={() => resetStatus("")}>
                            Hyunseok
                        </span>
                    </Link>
                    <section className="menu whitespace-nowrap">
                        <Link to="/">
                            <span className={`text-sm ${currentLocation == "" ? "text-violet-500" : ""}`} onClick={() => resetStatus("")}>
                                소개
                            </span>
                        </Link>
                        <span className="text-sm"> | </span>
                        <Link to="/blog">
                            <span className={`text-sm ${currentLocation == "blog" ? "text-violet-500" : ""}`} onClick={() => resetStatus("blog")}>
                                블로그
                            </span>
                        </Link>
                        <span className="text-sm"> | </span>
                        <Link to="/portfolio">
                            <span className={`text-sm ${currentLocation == "portfolio" ? "text-violet-500" : ""}`} onClick={() => resetStatus("portfolio")}>
                                포트폴리오
                            </span>
                        </Link>
                    </section>
                </div>
                <div className="navigator flex gap-3">
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
                                <TbLetterT />
                            </span>
                        </Tooltip>
                    </a>
                    <a href="/login">
                        <Tooltip label="로그인" aria-label="login" hasArrow arrowSize={10}>
                            <span>
                                <BsBoxArrowRight />
                            </span>
                        </Tooltip>
                    </a>
                </div>
            </div>
            <div ref={verticalscroll} className={`bg-black z-50 h-1 sticky top-12 overflow-hidden w-[${scrollWith}%]`} style={{ width: `${scrollWith}%` }}></div>
        </>
    );
};

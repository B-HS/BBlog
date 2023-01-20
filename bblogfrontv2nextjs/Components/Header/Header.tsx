import { Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsBoxArrowRight, BsGithub } from "react-icons/bs";
import { TbLetterT } from "react-icons/tb";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import { logout, tokenRefresher } from "../../Store/Async/memberAsync";
import { setUserInfo } from "../../Store/Slice/memberSlice";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { tokenInfo } from "../../Typings/type";

export const decodeJwt = (tkn: string) => {
    if(!tkn.includes(".")){
        return
    }
    const base64Payload = tkn.split(".")[1];
    const payloadBuffer = Buffer.from(base64Payload, "base64");
    return JSON.parse(payloadBuffer.toString()) as tokenInfo;
};

export const Header = () => {
    const dispatch = useAppDispatch();
    const { member } = useAppSelector((state) => state.member);
    const router = useRouter();
    const [scrollWith, setScrollWith] = useState<number>(0);
    const [currentLocation, setCurrentLocation] = useState<string>("");
    const verticalscroll = useRef<HTMLDivElement>(null);

    const scrollbar = useCallback(() => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setScrollWith((winScroll / height) * 100);
    }, [scrollWith]);

    const resetStatus = (name: string) => {
        window.scrollTo(0, 0);
        setScrollWith(0);
        setCurrentLocation(name);
    };


    useEffect(() => (window.onscroll = () => scrollbar()), []);
    useEffect(() => setCurrentLocation(window.location.href.split("/")[3]), [router]);
    useEffect(() => {
        if (!getCookie("refresh") && !getCookie("access")) {
            dispatch(setUserInfo(null));
            return;
        }        
        if(!decodeJwt(getCookie("access"))&&!decodeJwt(getCookie("refresh"))){
            removeCookie("refresh");
            removeCookie("access");
            dispatch(setUserInfo(null));
            return
        }

        const atkn: tokenInfo = decodeJwt(getCookie("access"));
        const rtkn: tokenInfo = decodeJwt(getCookie("refresh"));
        const now = new Date();
        const msNow = Number.parseInt((now.getTime() / 1000).toFixed(0));

        if (atkn.exp - msNow < 300 || rtkn.exp - msNow < 300) {          
            dispatch(tokenRefresher({ access: getCookie("access"), refresh: getCookie("refresh") })).then((res) => {
                if (!res.payload) {
                    removeCookie("refresh");
                    removeCookie("access");
                    return;
                }
                                
                setCookie("access", "Bearer " + res.payload.access, { path: "/" });
                setCookie("refresh", "Bearer " + res.payload.refresh, { path: "/" });
            });
        }

        if (rtkn.userNumber !== atkn.userNumber) {
            removeCookie("refresh");
            removeCookie("access");
        }

        dispatch(
            setUserInfo({
                mid: atkn.userNumber,
                nickname: atkn.nickname,
                email: atkn.email,
            })
        );
    }, [router]);

    const memberLogout = () => {
        removeCookie("access");
        dispatch(logout({ refresh: getCookie("refresh") })).then((res) => {
            if (res.payload) {
                removeCookie("refresh");
                router.push("/logout");
            }
        });
        
    };

    return (
        <>
            <div className="header h-12 mx-[0.07rem] bg-white bg-opacity-50 text-black flex items-baseline justify-between sticky top-0 gap-2 text-lg z-50 transition ease-in-out duration-200 hover:bg-opacity-100 pt-2 px-3 border-b">
                <div className="main flex items-baseline gap-2">
                    <Link href="/">
                        <span className="text-2xl" onClick={() => resetStatus("")}>
                            Hyunseok
                        </span>
                    </Link>
                    <section className="menu whitespace-nowrap">
                        <Link href="/">
                            <span className={`text-sm ${currentLocation == "" ? "text-violet-500" : ""}`} onClick={() => resetStatus("")}>
                                소개
                            </span>
                        </Link>
                        <span className="text-sm"> | </span>
                        <Link href="/blog">
                            <span className={`text-sm ${currentLocation == "blog" ? "text-violet-500" : ""}`} onClick={() => resetStatus("blog")}>
                                블로그
                            </span>
                        </Link>
                        <span className="text-sm"> | </span>
                        <Link href="/portfolio">
                            <span className={`text-sm ${currentLocation == "portfolio" ? "text-violet-500" : ""}`} onClick={() => resetStatus("portfolio")}>
                                포트폴리오
                            </span>
                        </Link>
                    </section>
                </div>
                <div className="navigator flex gap-3">
                    <a href="https://github.com/B-HS" aria-label={"github/b-hs"}>
                        <Tooltip label="깃허브" aria-label="gibhub" hasArrow arrowSize={10}>
                            <span>
                                <BsGithub />
                            </span>
                        </Tooltip>
                    </a>
                    <a href="https://hbyun.tistory.com/" aria-label={"tistoryblog/hbyun"}>
                        <Tooltip label="티스토리" aria-label="tistory" hasArrow arrowSize={10}>
                            <span>
                                <TbLetterT />
                            </span>
                        </Tooltip>
                    </a>
                    {!member && (
                        <Link href="/login">
                            <Tooltip label="로그인" aria-label="login" hasArrow arrowSize={10}>
                                <span>
                                    <BsBoxArrowRight className={` ${currentLocation == "login" ? "text-violet-500" : ""}`} onClick={() => resetStatus("login")} />
                                </span>
                            </Tooltip>
                        </Link>
                    )}
                    {member && (
                        <Tooltip label="로그아웃" aria-label="logout" hasArrow arrowSize={10}>
                            <span className="cursor-pointer">
                                <BiLogOut className="text-blue-800" onClick={() => memberLogout()} />
                            </span>
                        </Tooltip>
                    )}
                </div>
            </div>
            <div ref={verticalscroll} className={`bg-black z-50 h-1 sticky top-12 overflow-hidden w-[${scrollWith}%]`} style={{ width: `${scrollWith}%` }}></div>
        </>
    );
};

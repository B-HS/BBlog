import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Logout = () => {
    const router = useRouter();
    useEffect(() => {
        let timer = setTimeout(() => router.push("/"), 2000);
        return ()=> clearTimeout(timer)
    }, []);
    return (
        <section className="py-52 flex  flex-col items-center justify-center gap-3">
            <span className="font-bold text-3xl">로그아웃 되었습니다</span>
        </section>
    );
};

export default Logout;

import { t } from "i18next";

const Custom500Page = () => {
    const goBack = () => window.history.back();

    return (
        <section className="w-full flex flex-col justify-center items-center gap-2">
            <img className="unknown w-[75%] min-w-[350px]" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYWnhg%2Fbtr9rgVjbom%2FE4BgkmjwqMdKwzo6JiFAL1%2Fimg.png" alt="" />
            <span>404 PAGE NOT FOUND</span>
            <button className="gobackbtn btn btn-sm" onClick={goBack}>
                {t("goback")}
            </button>
        </section>
    );
};

export default Custom500Page
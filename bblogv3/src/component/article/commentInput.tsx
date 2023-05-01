import { requestAddComment, requestCommentList, uploadImage } from "@/ajax/ajax";
import useInput from "@/hooks/useInput";
import { resetCommentInfo } from "@/store/global/global";
import { AppDispatch } from "@/store/store";
import { Button, Flex, Image, Input, Textarea, useToast } from "@chakra-ui/react";
import { t } from "i18next";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const CommentInput = () => {
    const [nickname, nicknameOnChange, setNickname] = useInput();
    const [password, passwordOnChange, setPassword] = useInput();
    const [context, contextOnChange, setContext] = useInput();
    const [uploadedImg, setUploadedImg] = useState<string>();
    const toast = useToast();
    const router = useRouter();
    const { slug } = router.query;
    const imgBox = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const imgUpload = (e: ChangeEvent<HTMLInputElement>) => {
        let formData = new FormData();
        if (e.target.files) {
            formData.append("upload", e.target.files[0]);
            dispatch(uploadImage(formData)).then((res) => {
                setUploadedImg(res.payload);
            });
        }
    };

    const commentWrite = () => {
        if (nickname.trim().length === 0) {
            toast({
                title: t("comment_no_nickname"),
                isClosable: false,
                variant: "subtle",
                status: "warning",
            });
            return;
        }
        if (password.trim().length === 0) {
            toast({
                title: t("comment_no_pw"),
                isClosable: false,
                variant: "subtle",
                status: "warning",
            });
            return;
        }
        if (context.trim().length === 0) {
            toast({
                title: t("comment_no_desc"),
                isClosable: false,
                variant: "subtle",
                status: "warning",
            });
            return;
        }

        if (!/^[a-zA-Z0-9]*$/.test(password)) {
            toast({
                title: t("comment_no_desc"),
                isClosable: false,
                variant: "subtle",
                status: "warning",
            });
            setPassword("");
            return;
        }

        dispatch(
            requestAddComment({
                aid: slug as unknown as number,
                nickname: nickname,
                pw: password,
                commentImg: uploadedImg,
                commentDesc: context,
                commentSort: 0,
            })
        ).then((res) => {
            toast({
                title: t("comment_registered"),
                isClosable: false,
                variant: "subtle",
                status: "success",
            });
            dispatch(resetCommentInfo());
            dispatch(requestCommentList({ size: res.payload, page: 0, aid: slug as string })).then(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                setNickname("")
                setPassword("")
                setUploadedImg("")
                setContext("")
            });
        });
    };

    return (
        <Flex padding="1.25rem" marginY={"2rem"} flexDirection={"column"} width={"100%"}>
            <Flex alignItems={"center"} gap={5}>
                <Image boxSize="68px" objectFit="cover" src={"/favicon.ico"} alt={`profile-${"username"}`} alignSelf="flex-start" />
                <Flex flexDirection={"column"} width={"100%"} gap={2}>
                    <form>
                        <Flex gap={1} alignItems={"baseline"} className="font-extralight" flexDirection={"column"}>
                            <Input className="custom-input" placeholder={t("nickname")!} size="sm" borderRadius={0} value={nickname} onChange={nicknameOnChange} autoComplete="off" />
                            <Input className="custom-input" type={"password"} placeholder={t("pw")!} size="sm" borderRadius={0} value={password} onChange={passwordOnChange} autoComplete="off" />
                        </Flex>
                    </form>
                    <Textarea placeholder={t("context")!} border={0} borderRadius={0} className="custom-input resize-none" value={context} onChange={contextOnChange} />
                    <Flex justifyContent={"flex-end"} className="text-sm text-gray-500 " gap={3}>
                        <input type="file" ref={imgBox} className="hidden" onChange={imgUpload} />
                        <Button size={"sm"} borderRadius={0} onClick={() => imgBox.current?.click()}>
                            {uploadedImg ? t("upload_finished") : t("upload_profile_img")}
                        </Button>
                        <Button size={"sm"} borderRadius={0} onClick={commentWrite}>
                            {t("write_submit")}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CommentInput;

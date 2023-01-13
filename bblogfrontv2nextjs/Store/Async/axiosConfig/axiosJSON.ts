// react를 기준으로 작성
import Axios from "axios";
import AXIOS_URL from "./URL";
const axiosJSON = Axios.create({
    timeout: 2000,
    url: AXIOS_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Token": "쿠키에서 엑세스토큰 가져오기",
        "Refresh-Token": "쿠키에서 리프래시토큰 가져오기",
    },
});

export default axiosJSON;

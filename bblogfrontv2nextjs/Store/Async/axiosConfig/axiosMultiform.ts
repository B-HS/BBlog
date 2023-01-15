import Axios from "axios";
import AXIOS_URL from "./URL";
const axiosMultiform = Axios.create({
    timeout: 2000,
    url: AXIOS_URL,
    headers: {
        "Content-Type": "multipart/form-data",
        // "Access-Token": "쿠키에서 엑세스토큰 가져오기",
        // "Refresh-Token": "쿠키에서 리프래시토큰 가져오기",
    },
});

export default axiosMultiform;

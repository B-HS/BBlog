// react를 기준으로 작성
import Axios from "axios";
import AXIOS_URL from "./URL";
const axiosMultiform = Axios.create({
    timeout: 2000,
    url: AXIOS_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export default axiosMultiform;

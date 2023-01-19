import Axios from "axios";
import AXIOS_URL from "./URL";
const axiosJSON = Axios.create({
    timeout: 10000,
    url: AXIOS_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosJSON;

import axios from "axios";

const instance =axios.create({
    baseURL: '', // 后端根url 之后请求直接写接口url就行
    timeout: 5000 //超时时间
});

export default instance
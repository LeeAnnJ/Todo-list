import axios from 'axios';

function requestService(config){
    // 请求配置
    const service =axios.create({
        baseURL: 'http://localhost:3000', // 后端根url 之后请求直接写接口url就行
        timeout: 5000 //超时时间
    });

    // request拦截器
    service.interceptors.request.use(config =>{
        return config
    },error =>{
        console.log(err)
        Promise.reject(error)
    })

    // 响应拦截器
    service.interceptors.response.use(res =>{
            console.log(res)
            return res
        },error =>{
            return Promise.reject(error)
        }
    )
    return service(config)
}

export default{
    requestService
}
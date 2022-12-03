// 测试axios框架的方法
import Service from "../axios";

async function testGET(){
    return await Service.requestService({
        url: 'https://httpbin.org/get',
        method: 'get',
    })
}

export default{
    testGET
}
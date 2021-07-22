import {request} from 'umi';
import API from "@/services/api";

const mockBaseTimeOutReslove: any = async (data: any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 2000)
    })
};

/** 请求的方法 */

/* */
export async function ApiFunction(data: Record<string, any>) {
    return request(API.some_url, {
        method: 'POST', // GET ( 默认 ) PUT | DELETE | GET
        data,
    });
}

/* 模拟登录 */
export async function ApiLoginFunction(data: Record<string, any>) {
    const {username, password} = data;
    if (username === 'admin' && password === 'admin') {
        return mockBaseTimeOutReslove({data, err: false});
    }
    return mockBaseTimeOutReslove({err: true});
    // return mockBaseTimeOutReslove(data);
}

/* 模拟用户信息 */
export async function ApiGetUserInfoFunction() {
    return mockBaseTimeOutReslove({data: {username: 'admin'}, err: false});
    // return mockBaseTimeOutReslove(data);
}





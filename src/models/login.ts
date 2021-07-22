import {ApiLoginFunction, ApiFunction} from '@/services';
import {message} from 'antd';
import {setToken} from '@/utils/cookie';
import {goto} from "@/utils/utils";

export interface loginModelStatePros {
    loginInfo: any,
    codeUrl: {
        key?: string | null | undefined,
        code?: string | null | undefined
    }
}

const loginModelState: loginModelStatePros = {
    loginInfo: undefined,
    codeUrl: {
        key: undefined,
        code: undefined
    }
};


export default {
    namespace: 'login',
    state: loginModelState,
    effects: {
        * fetchLogin({payload}: any, {call, put}: any) {
            /* 模拟请求 */
            const {data, err}: FRID.Generator = yield call(ApiLoginFunction, payload);
            if (err) {
                message.error('账号密码错误');
                return
            }
            yield put({
                type: 'changeLoginStatus',
                payload: data
            });
            message.success('登录成功');
        },
        * fetchCodeUrl({payload}: any, {call, put}: any) {
            /* 模拟获取登录验证码 */
            const {data, err}: FRID.Generator = yield call(ApiFunction, payload);
            if (err) return;
            yield put({
                type: 'changeCodeUrl',
                payload: data
            });
        },
    },
    reducers: {
        changeCodeUrl(state: any, {payload}: any) {
            return {
                ...state, codeUrl: payload
            };
        },
        changeLoginStatus(state: any, {payload}: any) {
            setToken(payload.username);
            // setToken(payload.token, {
            //     expires: payload.expire
            // });
            goto();
            return {
                ...state, loginInfo: payload
            };
        }
    },
    subscriptions: {
        // setup: ({history, dispatch}: any) => {
        //     return history.listen(({pathname, ...reset}: any) => {
        //         // console.log('路由切换',pathname, reset)
        //     });
        // }
    }
};
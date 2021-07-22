/**
 * 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
import {ResponseError, Context, RequestOptionsInit, ResponseInterceptor, RequestInterceptor} from 'umi-request';
import {getToken, removeToken} from '@/utils/cookie';
import {notification} from "antd";
import {history} from 'umi';
import {stringify} from "querystring";

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    405: '请求方法不被允许。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
const errorHandler = (error: ResponseError) => {
    console.group('中间件错误处理');
    // error, error.response, error.message, error.data, error.name
    console.log('error:', error);
    console.log('error.response:', error.response);
    console.log('error.message:', error.message);
    console.log('error.name:', error.name === 'TypeError');
    console.log('error.data:', error.data);
    console.groupEnd();
    if (error.name === 'BizError') {
        notification.error({
            message: error.message || codeMessage[error.data.code]
        });
        if (error.data.code === 510) {
            removeToken();
            const {pathname} = history.location;
            history.replace({
                pathname: '/user/login',
                search: stringify({
                    redirect: pathname,
                }),
            });
            // history.replace('/user/login');
        }
    }
    if (error.name === "TypeError") {
        notification.error({
            message: error.message
        });
    }
    if (error.name === "ResponseError") {
        notification.error({
            message: codeMessage[error.response.status] || error.message
        });
    }

    // throw error; // 如果throw. 错误将继续抛出.
    // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
    return {err: error.data || true};
};


const middleware = async (ctx: Context, next: () => void) => {
    // console.log('request1');
    await next();
    // console.log('response1');
};
const requestInterceptor: RequestInterceptor = (url: string, options: RequestOptionsInit) => {
    const newUrl = BASE_URL + url; // BASE_URL 'https://jsonplaceholder.typicode.com/userst/ol'
    let {headers} = options;
    const Authentication = getToken();
    if (Authentication) {
        headers = {
            ...headers,
            Authentication
        }
    }
    return {
        url: `${newUrl}`,
        options: {...options, headers},
    };
};
const responseInterceptor: ResponseInterceptor & any = async (response: Response, options: RequestOptionsInit) => {
    return response
};


export default {
    timeout: 0,
    // prefix: '',
    // suffix: '', // 后缀, 比如某些场景 api 需要统一加 .json
    // useCache: false, // 是否使用缓存（仅支持浏览器客户端）
    // validateCache: (url:string, options:any) => false,
    // ttl: 缓存时长, 0 为不过期
    // maxCache: 最大缓存数
    // requestType: post 请求时数据类型
    // parseResponse: 是否对 response 做处理简化
    // charset: 字符集 utf8 , gbk
    // responseType: json , text , blob , formData ...
    // cancelToken:取消请求的 Token CancelToken.token
    // throwErrIfParseFail	当 responseType 为 'json', 对请求结果做 JSON.parse 出错时是否抛出异常	boolean	--	false
    // getResponse	是否获取源 response, 返回结果将包裹一层	boolean	--	fasle
    // 为了让浏览器发送包含凭据的请求（即使是跨域源），需要设置 credentials: 'include'
    // 如果只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加credentials: 'same-origin'
    // 要改为确保浏览器不在请求中包含凭据，请使用credentials: 'omit'
    credentials: 'same-origin', // 默认请求是否带上cookie,
    errorConfig: {
        adaptor: (resData: any, ctx: any) => {
            const {msg, code} = resData;
            return {
                // ...resData,
                showType: 9, // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
                success: !code || code == 200,
                errorCode: code,
                data: resData,
                errorMessage: msg,
                errorPage: '/404'
            };
        },
    },
    // 默认错误处理
    errorHandler,
    middlewares: [middleware],
    requestInterceptors: [requestInterceptor],
    responseInterceptors: [responseInterceptor]

};
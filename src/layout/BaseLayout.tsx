import React from "react";
import {getToken} from "@/utils/cookie";
import {useDispatch, Redirect, history} from 'umi';
import {stringify} from 'querystring';

const BaseLayout: React.FC<any> = ({children, ...reset}) => {
    const isLogin = getToken();
    const dispatch = useDispatch();
    if (!isLogin) {
        const {pathname} = history.location;
        const queryString = stringify({
            redirect: pathname
        });
        return <Redirect to={`/user/login?${queryString}`}/>;
    }

    React.useEffect(() => {
        const isLogin = getToken();
        if (isLogin) {
            dispatch({
                type: 'user/fetchCurrentUser',
                payload: {}
            })
        }
    }, []);
    return (
        children
    );
};
export default BaseLayout;

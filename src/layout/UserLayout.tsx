import React from "react";
import {getToken} from "@/utils/cookie";
import {Redirect} from "react-router";
import {history} from "@@/core/history";


const UserLayout: React.FC<any> = ({children}) => {
  const isLogin = getToken();
  if (isLogin) {
    const {query} = history.location;
    const {redirect} = query as { redirect: string };
    let repath = redirect;
    if (!repath || repath === '/user/login') {
      repath = '/'
    }
    return <Redirect to={`${repath || '/welcome'}`}/>;
  }
  return (children)
};
export default UserLayout

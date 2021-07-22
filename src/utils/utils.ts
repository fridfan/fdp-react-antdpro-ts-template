/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import {history} from 'umi';
import {stringify} from 'querystring';
import PKG from '../../package.json';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

/** 此方法会跳转到 redirect 参数所在的位置 */
export const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const {query} = history.location;
    const {redirect} = query as { redirect: string };
    let repath = redirect;
    if (!repath || repath === '/user/login') {
      repath = '/'
    }
    history.replace({pathname: repath || '/'});
    // window.location.reload();
  }, 10);
};

export const gotoLogin = () => {
  if (!history) return;
  // window.location.reload();
  // return;
  setTimeout(() => {
    // const token: any = getToken();
    const {pathname} = history.location;
    // const {redirect} = query;
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }, 10);
};


export const logVersion = () => {
  console.log(`邮箱:%csss_fan@126.com%c`, 'color:red', '');

  console.groupCollapsed('当前发布版本');
  console.log(PKG.version);
  console.groupEnd();
  console.groupCollapsed('@frid/fdp-cli');
  console.log(`
 ________ ________  ___  ________     
|\\  _____\\\\   __  \\|\\  \\|\\   ___ \\    
\\ \\  \\__/\\ \\  \\|\\  \\ \\  \\ \\  \\_|\\ \\   
 \\ \\   __\\\\ \\   _  _\\ \\  \\ \\  \\ \\\\ \\  
  \\ \\  \\_| \\ \\  \\\\  \\\\ \\  \\ \\  \\_\\\\ \\ 
   \\ \\__\\   \\ \\__\\\\ _\\\\ \\__\\ \\_______\\
    \\|__|    \\|__|\\|__|\\|__|\\|_______|`);
  console.groupEnd();
}

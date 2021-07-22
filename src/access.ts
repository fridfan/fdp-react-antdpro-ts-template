/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: any }) {
  // const {currentUser = {menuList: []}} = initialState || {};
  // console.log(currentUser, 'currentUsercurrentUsercurrentUsercurrentUser');
  // const {menuList = []} = currentUser;
  return {
    normalRouteFilter: (route: any) => {
      // console.log(route);
      return true;
      // return menuList.includes(route.authKey[0])
    }, // initialState 中包含了的路由才有权限访问
  };
}

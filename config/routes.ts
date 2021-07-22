export default [
  {
    path: '/user',
    component: '../layout/UserLayout',
    menuRender: false,
    headerRender:false,
    // flatMenu: true,
    // layout:false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: 'user/Login',
      },
      {
        component: './404',
      },
    ]
  },
  {
    path: '/',
    exact: false,
    // layout: false,
    component: '../layout/BaseLayout',
    flatMenu: true,
    // menu: {
    //     flatMenu: true,
    // },
    routes: [
      {
        path: '/',
        exact: true,
        redirect: '/welcome',
      },
      {
        // layout: false,
        // menuRender: false,
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',

      },
      {
        component: './404',
      },
    ]
  }
];

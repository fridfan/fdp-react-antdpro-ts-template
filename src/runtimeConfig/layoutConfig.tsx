import RightContent from "@/components/RightContent";
import Footer from "@/components/Footer";
import {FormattedMessage} from "umi";

export default ({initialState}: any) => {
  const {settings: {logo, title, ...setting}}: any = initialState;
  return {
    logo,
    title,
    onPageChange: (res: any) => {
    },
    // pageTitleRender: false,
    // rightContentRender: () => <RightContent/>,
    rightRender: () => <RightContent/>,
    footerRender: () => <Footer/>,
    breadcrumbRender: (routers = []): any => ([
      {
        path: '/',
        breadcrumbName: <FormattedMessage
          id="menu.home"
        />
      },
      ...routers
    ]),
    // 自定义 403 页面
    // unAccessible: <div>403</div>,
    ...setting
  };
}

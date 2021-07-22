import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  siderWidth?:number
} = {
  navTheme: 'dark',
  siderWidth: 208,
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'FRID',
  pwa: false,
  logo: '/logo.png',
  iconfontUrl: '',
  // menuRender:false // 不渲染菜单
};


export default Settings;

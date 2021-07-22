import {defineConfig} from 'umi';
import defaultSettings from './defaultSettings';
import routes from './routes';
// import chainWebpackConfig from './chain.webpack'

const {REACT_APP_ENV}: any = process.env;
console.log('当前环境是：',REACT_APP_ENV);

export default defineConfig({
  hash: true,
  mock: false,
  base: '/',
  publicPath: './',
  outputPath: 'dist',
  history: {
    type: "hash"
  },
  define: {
    BASE_URL: process.env[REACT_APP_ENV] || undefined,
  },
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    locale: true
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  routes,
  theme: {
    '@primary-color': defaultSettings.primaryColor,
    // '@primary-color': '#1DA57A',
  },
  esbuild: {},
  //https://umijs.org/zh-CN/plugins/plugin-locale
  title: false,
  ignoreMomentLocale: true,
  proxy: {},
  manifest: {
    basePath: '/',
  },
  fastRefresh: {},
});

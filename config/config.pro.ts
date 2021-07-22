// https://umijs.org/config/
import {defineConfig} from 'umi';
import chainWebpackConfig from './chain.webpack';

export default defineConfig({
    chainWebpack: chainWebpackConfig
});

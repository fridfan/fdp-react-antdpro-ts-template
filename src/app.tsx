import {RequestConfig, RunTimeLayoutConfig} from 'umi';
import requestConfig from '@/runtimeConfig/request';
import layoutConfig from "@/runtimeConfig/layoutConfig";
import initialConfig from "@/runtimeConfig/initialStateConfig";
import getInitial from "@/runtimeConfig/getInitialState";
import rootContain from "@/runtimeConfig/rootContainer";


/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = initialConfig;

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export const getInitialState = getInitial;

/* request拦截器 */
export const request: RequestConfig & any = requestConfig;


// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = layoutConfig;

export const rootContainer = rootContain;
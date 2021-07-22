// @ts-ignore
import path from 'path';

const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin'); // 减少包的体积

// @ts-ignore
function getModulePackageName(module: any): any {
    if (!module.context) return null;
    const nodeModulesPath = path.join(__dirname, '../node_modules/');

    if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
        return null;
    }

    const moduleRelativePath = module.context.substring(nodeModulesPath.length);
    const [moduleDirName] = moduleRelativePath.split(path.sep);
    let packageName = moduleDirName; // handle tree shaking

    if (packageName && packageName.match('^_')) {
        // eslint-disable-next-line prefer-destructuring
        packageName = packageName.match(/^_(@?[^@]+)/)[1];
    }

    return packageName;
}

// @ts-ignore
const webpackPlugin = (config: any,{webpack}) => {
    // config.plugins.delete('progress');
    config.plugins.delete('friendly-error');
    // config.plugins.delete('copy');
    config.plugin('AntdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin, [
        {
            preset: 'antdv4'   //看你项目中使用的antd是v几版本
        }
    ]);

    config.merge({
        optimization: {
            minimize: true,
            splitChunks: {
                chunks: 'async',
                minSize: 30000, //文件最小打包体积，单位byte，默认30000，若单个文件不满足会合并其他文件组成一个
                minChunks: 2, //最小使用到次数，超过2次执行
                automaticNameDelimiter: '.', //连接符
                cacheGroups: {
                    vendors: {
                        // 基本框架
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                        // chunks: 'all',
                        priority: 10,
                    },
                    antdesigns: {
                        name: 'antdesigns',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
                        priority: 11,
                    },
                    jsdk: {
                        name: 'jsdk',
                        chunks: 'initial',
                        test: /[\\/]node_modules[\\/](china-division|dingtalk-jsapi|lodash|moment)[\\/]/,
                        priority: 11,
                    },
                    'async-commons': {
                        // 其余异步加载包
                        chunks: 'async',
                        minChunks: 2,
                        name: 'async-commons',
                        priority: 9,
                    },
                    // default: {
                    //     name: 'default',
                    //     minChunks: 1,
                    //     priority: -1,
                    //     reuseExistingChunk: true,
                    // },

                },
            },
        },
    });
    //过滤掉momnet的那些不使用的国际化文件
    config
        .plugin('replace')
        .use(require('webpack').ContextReplacementPlugin)
        .tap(() => {
            return [/moment[/\\]locale$/, /zh-cn/];
        });





    // optimize chunks
    // config.optimization // share the same chunks across different modules
    //     .runtimeChunk(false)
    //     .splitChunks({
    //         chunks: 'async',
    //         name: 'vendors',
    //         maxInitialRequests: Infinity,
    //         minSize: 0,
    //         cacheGroups: {
    //             vendors: {
    //                 test: (module: any) => {
    //                     const packageName = getModulePackageName(module) || '';
    //                     if (packageName) {
    //                         // console.log(packageName);
    //                         return [
    //                             'bizcharts',
    //                             'gg-editor',
    //                             'g6',
    //                             '@antv',
    //                             'l7',
    //                             'gg-editor-core',
    //                             'bizcharts-plugin-slider',
    //                         ].includes(packageName);
    //                     }
    //
    //                     return false;
    //                 },
    //                 name(module: any) {
    //                     const packageName = getModulePackageName(module);
    //
    //                     if (packageName) {
    //                         if (['bizcharts', '@antv_data-set'].indexOf(packageName) >= 0) {
    //                             return 'viz'; // visualization package
    //                         }
    //                     }
    //                     return 'misc';
    //                 },
    //             },
    //             /*antd:{
    //               name:'argrace',
    //               test:/[\\/]node_modules[\\/](@antd-desigin|antd|antd-mobile)[\\/]/,
    //               chunks:'all',
    //               priority: 10,
    //             }*/
    //             antdesigns: {
    //                 name: 'antdesigns',
    //                 // chunks: 'all',
    //                 test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
    //                 priority: 11,
    //             },
    //         },
    //     });
};

export default webpackPlugin;
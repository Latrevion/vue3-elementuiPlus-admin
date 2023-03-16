// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   lintOnSave: false,
//   transpileDependencies: true,
// });
const path = require("path")
function resolve(dir) {
  return path.join(__dirname, dir)
}
const AutoImport = require("unplugin-auto-import/webpack")
const Components = require("unplugin-vue-components/webpack")
const {ElementPlusResolver} = require("unplugin-vue-components/resolvers")





module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "" : "./",
  // 输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  /** vue3.0内置了webpack所有东西，
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  chainWebpack: (config) => {
     // const svgRule = config.module.rule("svg");
     // svgRule.uses.clear();
     // svgRule
     //   .use("svg-sprite-loader")
     //   .loader('svg-sprite-loader')
     //   .options({
     //     symbolId: "icon-[name]",
     //     include:["./src/components/SvgIcon/icon"]
     //   });
    config.module
      .rule('svg')
      .exclude.add(resolve('./src/components/SvgIcon/icon'))
      .end()
    config.module
      .rule('icons')
      .test(/.svg$/)
      .include.add(resolve('./src/components/SvgIcon/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // css: {
      //   modules:{
      //     auto:()=>true,
      //   }
      // },
      scss: {
        additionalData: `@import "./src/styles/main.scss";`,
      }
    },
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false, //编译完成是否自动打开网页
    host: "0.0.0.0",//指定使用地址，
    port: 8080,//端口
    https:false,//编译失败时刷新页面
    hot:true,//开启热加载
    proxy: {
      [process.env.VUE_APP_API]: {
        target:process.env.VUE_APP_API_TARGET,
        changeOrigin:true,//是否跨域
        ws:false, //websockets
        secure:false, //https接口
        pathRewrite:{
         [`^${process.env.VUE_APP_API}`]:"" //重写开头/devApi字符串为空
        }
      }
    }
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {},
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
}
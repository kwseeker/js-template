# Tailwind CSS

一个 CSS 组件框架，其理念是提供一套完整的，最小单位的工具类CSS，再由设计师将它们组合起来。
可以让你脱离css文件，在html直接通过class修改样式。

另外官方还提供了组件库（tailwindplus）和网页模板（收费）。

## 1 Tailwind CSS 的集成

官方提供了几种集成方式。

```shell
# 1 首先创建 Vite React、Vue项目，这里忽略

# 2 tailwindcss v4 之后版本执行
npm i -D tailwindcss @tailwindcss/vite
# 3 修改 vite.config.js， 不需要再去配置 postcss.config.js 和 tailwind.config.js 了
# import tailwindcss from "@tailwindcss/vite";
# export default defineConfig({ 
#   plugins: [ 
#     tailwindcss()
#   ],
# });
# 4 在 App.css 中添加 
# @import "tailwindcss";

# 2 tailwindcss v4 之前版本执行
# 安装  tailwindcss 及其所需的依赖 （-D 是 --save-dev 的缩写）
npm i -D tailwindcss postcss autoprefixer
# 3 初始化 postcss 和 tailwindcss 配置
# postcss.config.js 主要是添加`tailwindcss`的插件，这样编写的css才会被`tailwindcss`处理
# tailwind.config.js 文件，主要进行扫描规则、主题、插件等配置
npx tailwindcss init -p
```

### 1.1 `npx tailwindcss init -p` 报错问题

上面命令的执行可能出现 `npm error could not determine executable to run`, 因为项目引入的 tailwindcss 是最新的版本（v4），从 v4开始初始化命令已经移到了 `@tailwindcss/cli` 包，参考 [taiwindcss/discussions/17620](https://github.com/tailwindlabs/tailwindcss/discussions/17620)。

从 v4 版本的 tailwindcss 命令帮助信息看已经没有 `init` 选项了。


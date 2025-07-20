# Tailwind CSS

一个 CSS 组件框架，其理念是提供一套完整的，最小单位的工具类CSS，再由设计师将它们组合起来。
可以让你脱离css文件，在html直接通过class修改样式。

另外官方还提供了组件库（tailwindplus）和网页模板（收费）。

## 1 Tailwind CSS 的集成

官方提供了几种集成方式 [installation](https://tailwindcss.com/docs/installation/using-vite)，这里以 Vite + React 项目为例（可以参考 `Using Vite`、`Install Tailwind CSS with React Router`， 配置是有效的）。

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

## 2 VSCode 环境配置

+ [Tailwind CSS IntelliSense 插件](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

  提供 tailwindcss 代码检查（浏览器默认不认识 className 中的语法，只是当作普通字符串）、悬停预览、补全、语法高亮等功能。

+ [Tailwind CSS Prettier 插件](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

  按推荐的顺序将样式类进行排序。

  ``` shell
  npm install -D prettier prettier-plugin-tailwindcss
  ```

  在 .prettierrc 配置中添加插件，并指定css文件入口点：

  ```json
  {
    "plugins": ["prettier-plugin-tailwindcss"],
    "tailwindStylesheet": "./src/App.css"
  }
  ```

  然后 `Ctrl + Alt + L` 格式化时会自动执行排序。

+ Tailwind CSS Tune 插件

  第三方插件，提供了同类样式的枚举以及选择功能，同一类样式可能有很多可选参数会将列举所有样式。


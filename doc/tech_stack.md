# js & ts 技术栈

## 1 **语言规范**

+ [ECMAScript](https://tc39.es/ecma262/)

  ECMAScript、JS、Node.js、TS 的关系：

  ECMAScript 定义了语言规范，
  JS 通常指前端 JavaScript， 遵循 ECMAScript 规范，依赖于浏览器引擎实现（比如 Chrome V8， 相当于 Java 的 JVM），提供了 DOM/BOM 等 API，
  Node.js 是服务端 JavaScript，同样遵循 ECMAScript 规范，依赖 Chrome V8 引擎，提供了服务端 API， 比如 fs、http 等，
  TS 是 JavaScript 的超集，拓展了静态类型系统等高级特性。

  TS 兼容 JS 的原理：

  编译（tsc、webpack）后输出纯 JS 代码。

## 2 **包管理器**

+ [npm](https://docs.npmjs.com/about-npm)

  包管理配置文件说明: [package.json](https://docs.npmjs.com/creating-a-package-json-file)。

+ cnpm

+ yarn

+ pnpm

  pnpm采用全局存储 + 符文链接的方式，减少磁盘占用。

## 3 脚手架

+ [Vite](https://cn.vite.dev/guide/)

  可以通过模板实现框架和工具的快速集成，还支持通过配置进行自定义以及通过插件进行拓展。

  模板是一些预定义好的项目结构，更多模板参考 Vite 的模板库：[awesome-vite](https://github.com/vitejs/awesome-vite?tab=readme-ov-file#templates)， 比如创建 React 应用的一个模板：[vite-template-react](https://github.com/SafdarJamal/vite-template-react)。

  关于 `npm run` 和 `vite` 命令的区别：

  `vite` 是专门用于 Vite 项目的命令，Vite 开发服务器利用了现代浏览器对 ES 模块的支持，实现了即时编译和按需加载的功能，这使得它可以非常快速地响应代码更改。此外，Vite 还提供了诸如依赖预构建、HMR（模块热替换）、环境变量支持等特性。

+ 其他

  一些框架有自己的脚手架工具，比如 React 的 CRA、Vue 的 vue-cli 等。

## 4 自动化构建工具

+ Grunt

+ Gulp

## 5 其他工具

+ npx

  依次从 node_modules/.bin、$PATH 下查找 npx 后的命令是否存在，存在直接执行，否则先下载然后再执行，执行完毕后自动删除。

+ [eslint](https://zh-hans.eslint.org/docs/latest/use/getting-started)

  代码静态分析工具。使用 Vite 模板创建项目时可能会自动添加 eslint 依赖。
  比如 package.json ：

  ```json
  {
    "devDependencies": {
      "eslint": "^9.30.1",
	  "eslint-plugin-react-hooks": "^5.2.0",
	  "eslint-plugin-react-refresh": "^0.4.20",
    }
  }
  ```

  关于 ESLint 配置文件说明：[ESLint Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files)。

## 6 常用库

### 6.1 UI 库

现在前端开发 UI 界面基本都是引用组件库。

+ [MUI](https://mui.com/)

  一个 React UI 组件库。

### 6.2 CSS 相关

+ [Emotion](https://emotion.sh/docs/introduction)

+ [Tailwind](https://www.tailwindcss.cn/docs/installation)

+ [PostCSS](https://www.postcss.com.cn/)

  可以转换新的 CSS 特性到浏览器兼容的版本。




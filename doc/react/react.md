# React 工作原理

## 1 核心概念

+ **组件**

  React 应用页面（UI）是有一组**嵌套的组件**组成的，组件实现上是**返回标签的JS函数**。

  组件功能：
  
  可以像普通的 HTML 那样引入样式；
  可以使用大括号 `{var}` 嵌入JS变量或JS表达式；
  可以定义并绑定事件`<button onClick={handleClick}>`，实现估计和上面嵌入JS变量一样；
  可以通过在组件内部通过 `<SomeComponent />` 引用另一个组件；
  可以通过 props、state 方式在父子组件间传递数据；
  可以在单独的JS文件中定义组件并通过 `export [default] function Profile() {...}` 导出组件，同一文件中，有且仅有一个默认导出，但可以有多个具名导出；
  如果希望在组件间共享状态（State），可以将相关状态从这两个组件上移除，并把这些状态移到最近的父级组件，然后通过 props 将状态传递给这两个组件（状态提升）。

  注意事项：
  不要在组件定义中定义其他组件；

  使用 Vite 生成的 App.jsx 中的 APP 组件是一个返回 `<>...</>`标签的函数(这里的无名的标签其实是对 HTML 片段的语法的转换)。
  React 通过使用 React 组件重新渲染 `index.html` 的 `<div id="root"></div>` 构建页面。
  比如：

  ```jsx
  createRoot(document.getElementById('root')).render(
    <StrictMode>
	  <App />
    </StrictMode>,
  )
  ```

+ **钩子**（Hook）

  常用内置钩子：

  + **useState**

    用于让组件记住一些数据，且可以被所有子组件共享。
    设置 state 的值会触发对所属组件的重新渲染（重新计算组件内容并提交到 DOM），注意在重新渲染时才会更新 state 的值。
    state 的值如同快照。
    如果 setState 方法中传入的是更新函数，函数将被加入更新队列，下次渲染时依次执行。
    应该将 state 视作只读的（不可变的），当state是多层嵌套对象或数组时，可以使用 Immer 简化写法。

  ```javascript
  // npm install use-immer
  import { useImmer } from 'use-immer' //替换 import { useState } from 'react'
  ```

  + **useRef**

  和 State 一样是让组件记住一些数据，但是和 State 不同的是设置值不会触发重新渲染， 没有快照行为。

  ref 属于一种脱围机制，不受 React 监管。

  ref 引用 DOM 元素时可以实现一些 React 没有实现的功能，比如让元素获取焦点、滚动到它等等。

  ```js
  const myRef = useRef(null);
  // 这里的 ref 不是 HTML 标准属性，而是 React 定义的属性，这里的写法有点反直觉，其实是将 div 对象的引用赋值给 myRef
  <div ref={myRef}>
  ```

  + **useReducer**

  + **useContext**

  + **useEffect**

+ **Prop & Context**

  Prop 可以像标签属性一样，向组件传递参数。
  Prop 胜在可读性，Context 胜在深层传参时实现方便。

+ **事件处理**

  [阻止事件向父组件传播](https://zh-hans.react.dev/learn/responding-to-events#stopping-propagation)：将事件处理方法封装一层，添加 `e.stopPropagation()`。
  [阻止默认行为](https://zh-hans.react.dev/learn/responding-to-events#preventing-default-behavior): `e.preventDefault();`。
  
+ **渲染**

  在进行初次渲染时, React 会调用根组件。
  对于后续的渲染, React 会调用内部状态更新触发了渲染的函数组件。

  注意在**开发环境**中，React 会在组件首次挂载（首次显示在页面上）后立即重新挂载一次，为了帮助开发者快速发现资源未清理等问题。

+ **Effect**

  使用 Effect 可以在**渲染结束后**执行一些代码，以便将组件与 React 外部的某个系统相同步。
  React 渲染期间是不允许对 DOM 对象进行操作的，这些操作可以放在 Effect 中实现。
  又或者在 React 组件挂载后，连接服务器。

  默认情况下，Effect 会在每次渲染后运行。应该避免在 Effect 内部修改 State 值，否则会陷入死循环。可以使用依赖数组避免每次渲染后重新执行 Effect。

  Effect 支持通过清理函数释放资源。
  清理函数的使用注意事项。

## 2 React应用核心功能

+ 路由
+ 数据获取
+ 性能优化

## 3 开发工具

+ VSCode React 配置 
+ React 开发者工具（开发调试）
+ React Compiler（程序优化）
## 4 开发模式

1. 将 UI 拆解为嵌套的组件
2. 构建静态内容
3. 添加交互逻辑
4. 性能优化

## 5 工作原理


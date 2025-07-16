import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 使用由 @vitejs/plugin-react 提供的插件
  // 提供 Babel 或 SWC 支持、Fast Refresh、优化开发体验、环境变量支持、代码转换等功能
  plugins: [react()],
})

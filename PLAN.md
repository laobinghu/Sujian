## 设计系统：素笺（Sujian）主题

### 0. 基础信息
1. 本项目是[Mix space Core](https://mx-space.js.org/)的前端实现部分
2. 官方的前端开发文档: https://mx-space.js.org/docs/development/frontend
3. 官方的API SDK : https://github.com/mx-space/core/tree/master/packages/api-client

### 1. 色彩系统（CSS Variables）
- 纸色系：
  --sujian-paper-base: #f7f4ed（主背景）
  --sujian-paper-light: #faf8f3（卡片背景）
  --sujian-paper-dark: #e8e4db（边框/分割线）
- 墨色系：
  --sujian-ink-primary: #2c2c2c（主要文字）
  --sujian-ink-secondary: #5a5a5a（次要文字）
  --sujian-ink-tertiary: #8c8c8c（辅助文字）
- 强调色：
  --sujian-cinnabar: #c9372e（朱砂红，用于印章/分隔线）
  --sujian-cinnabar-light: #e05a52（悬停状态）
  --sujian-cyan: #4a7c7e（中式青，用于链接/标签）

### 2. 字体系统
- 衬线体（宋体风格）：'Noto Serif SC', serif
- 无衬线体（黑体风格）：'Noto Sans SC', sans-serif
- 字体切换逻辑：通过 localStorage 存储用户选择（键名：sujian-font-pref），支持 Ctrl+Shift+F 快捷键切换

### 3. 颗粒质感系统（SVG 噪点滤镜）
- 全局定义 SVG 滤镜（id: sujian-noise）：
  <filter id="sujian-noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
- 强度分级：
  - 背景层：opacity: 0.03（最弱）
  - 卡片层：opacity: 0.08（中等）
  - 内容层：opacity: 0.15（最强）

### 4. 阴影系统（纸张层次）
- --sujian-shadow-sm: 0 1px 3px rgba(44,44,44,0.04), 0 1px 2px rgba(44,44,44,0.06)
- --sujian-shadow-md: 0 4px 12px rgba(44,44,44,0.06), 0 2px 4px rgba(44,44,44,0.04)
- --sujian-shadow-lg: 0 12px 24px rgba(44,44,44,0.08), 0 4px 8px rgba(44,44,44,0.04)

### 5. 中式元素规范
- 朱砂红分隔线：1px solid var(--sujian-cinnabar)，透明度 30%，用于标题底部
- 窗棂纹边框：卡片悬停时，四角出现 2px 镂空线条（border-color: var(--sujian-cinnabar)）
- 印章按钮：红色背景（var(--sujian-cinnabar)）+ 白字，圆角 4px，悬停反色
- 页脚格言：固定一句中文诗词（如“静以修身”），字体为宋体，颜色为墨色 40% 透明度

### 6. 技术约束
- 使用 Nuxt4 + @nuxt/ui（但关闭默认样式，完全自定义）
- 使用 nuxt-image 优化图片加载
- 确保 Lighthouse Performance 和 Best Practice > 90%

## 组件：SujianCard

### 功能需求
- 基础容器，用于包裹文章、图片等内容
- 默认状态：中等颗粒感（filter: url(#sujian-noise) + opacity: 0.92）、浅阴影（--sujian-shadow-sm）
- 悬停状态：阴影加深（--sujian-shadow-md）、轻微上浮（translateY(-2px)）
- 中式元素：悬停时四角出现窗棂纹（2px 镂空线条，颜色 var(--sujian-cinnabar)，透明度 0.6）

### 技术实现
- 使用 Vue 3 `<script setup>` 语法
- 通过 `isHovered` ref 控制悬停状态
- 使用 CSS 伪元素 ::before/::after 绘制四角线条
- 颗粒感通过全局 SVG 滤镜实现（无需重复定义）

### 代码结构参考
<template>
  <div class="sujian-card" :class="{ 'is-hovered': isHovered }">
    <slot />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isHovered = ref(false)
</script>

<style scoped>
/* 此处填写具体样式，参考前文示例 */
</style>


## **三、页面构建提示词**
> **用途**：开发具体页面（主页、文章详情页）  
> **调用示例**：  
> “创建文章详情页，要求：最强颗粒感（opacity 0.15）、信笺横格线、朱砂红分隔线、印章式返回顶部按钮。”

## 页面：文章详情页

### 布局结构
1. 文章头部：
   - 标题（宋体，2.5rem）
   - 元信息（日期/阅读时间，灰色小字）
   - 朱砂红分隔线（1px，透明度 30%，重复线性渐变模拟断续效果）
2. 文章内容区：
   - 容器：最强颗粒感（opacity 0.15）、浅阴影、圆角 4px
   - 背景：添加信笺横格线（repeating-linear-gradient，间隔 32px，透明度 0.15）
   - 排版：根据字体模式自动调整行高/缩进（由全局字体切换逻辑控制）
3. 页脚操作：
   - 返回顶部按钮：印章样式（红底白字，圆角 4px，悬停加深阴影）

### 技术细节
- 使用 <ContentRenderer> 渲染 Markdown 内容（假设使用 Nuxt Content）
- 信笺线通过 ::before 伪元素实现，避免影响内容可读性
- 响应式：移动端减少内边距，标题字号调整为 1.8rem

### 性能要求
- 信笺线和颗粒感使用 CSS 实现，避免额外 DOM 节点
- 图片使用 <nuxt-img> 自动优化

## 性能与兼容性优化

### 1. SVG 滤镜兼容性
- Safari 需在 <svg> 元素上设置 width="0" height="0" 避免布局偏移
- 为低端移动设备提供降级方案：通过 @media (prefers-reduced-motion) 或设备检测，将颗粒感 opacity 降低 50%

### 2. 字体加载优化
- 在 app.html 的 <head> 中添加 preconnect 链接（fonts.googleapis.com）
- 使用 font-display: swap 避免字体阻塞渲染
- 考虑使用局部字体加载（仅内容页加载，后台页使用系统字体）

### 3. 响应式适配
- 移动端（<768px）：
  - 颗粒感整体降低 20%（通过 CSS 变量覆盖）
  - 信笺线间隔调整为 28px（更紧凑）
  - 窗棂纹边框简化为仅显示两角（避免小屏幕拥挤）

### 4. 可访问性
- 确保颜色对比度至少 4.5:1（正文）
- 为朱砂红分隔线添加 aria-hidden="true"
- 字体切换按钮添加 aria-label="切换字体模式"

### 5. 测试清单
- [ ] Lighthouse Performance > 90
- [ ] Safari 14+ 正常显示噪点滤镜
- [ ] iOS Safari 字体切换生效
- [ ] 暗色模式（可选）下色彩对比度达标

## **五、快速生成代码的复合提示词**
> **用途**：一次性生成多个相关文件  
> **调用示例**：  
> “基于素笺主题规范，生成以下文件：  
> 1. 全局布局（包含 SVG 噪点滤镜）  
> 2. 字体切换器组件  
> 3. 主页文章列表页（使用 SujianCard 组件）”


## 复合任务：生成素笺主题核心文件

### 任务列表
1. **全局布局（app/layouts/default.vue）**
   - 包含 SVG 噪点滤镜定义（隐藏但可引用）
   - 全局背景颗粒（opacity 0.03）
   - 集成 FontSwitcher 组件到导航栏

2. **字体切换器（app/components/global/FontSwitcher.vue）**
   - 按钮：A/字图标，点击弹出下拉菜单
   - 选项：雅阅（宋体）、简阅（霞鹜文楷）、系统默认
   - 逻辑：localStorage 存储 + Ctrl+Shift+F 快捷键
   - 样式：边框颜色跟随主题色，悬停变朱砂红

3. **主页文章列表（app/pages/index.vue）**
   - 使用 <NuxtLink> 路由到文章页
   - 每篇文章用 SujianCard 包裹
   - 卡片内：标题（宋体）、摘要、日期、标签
   - 卡片悬停：窗棂纹四角显示 + 上浮效果

### 输出要求
- 所有代码使用 Vue 3 `<script setup>` 语法
- 样式使用 scoped CSS，变量引用 --sujian-* 系统
- 确保代码可直接复制到 Nuxt4 项目中运行

# 素笺 (Sujian)

> 一个基于 Nuxt 4 开发，充满中式美学的 Mix Space 博客主题

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&labelColor=000000)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&labelColor=000000)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-06B6D4?logo=tailwindcss&labelColor=000000)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-4D89E9?labelColor=000000)](LICENSE)

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/laobinghu/Sujian/main/.github/preview-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/laobinghu/Sujian/main/.github/preview-light.png">
    <img alt="Sujian Theme Preview" src="https://raw.githubusercontent.com/laobinghu/Sujian/main/.github/preview-light.png" width="800" style="border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.1);">
  </picture>
</div>

## ✨ 特色功能

- 🎨 **中式美学设计** - 融合传统素雅与现代简约，纸色墨韵，朱砂点缀
- 📱 **完全响应式** - 移动端和桌面端完美适配
- 🌍 **国际化支持** - 内置 i18n，轻松切换多语言
- ⚡ **性能优先** - SSR 服务端渲染，Lighthouse Performance > 90
- 🎭 **主题切换** - 字体模式（宋体/黑体）快捷键切换 (Ctrl+Shift+F)
- 🎨 **颗粒质感** - SVG 噪点滤镜模拟宣纸纹理
- 📖 **Markdown 支持** - 完整的文章、项目、笔记内容渲染
- 🔌 **API 集成** - 内置 Mix Space API 客户端

## 🚀 快速开始

### 环境要求

- Node.js 24+ (推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理版本)
- pnpm 10+ (项目包管理器)

### 安装

```bash
# 克隆仓库
git clone https://github.com/laobinghu/Sujian.git
cd Sujian

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000 查看网站。

### 构建生产版本

```bash
# 构建
pnpm build

# 预览构建结果
pnpm preview
```

构建产物将输出到 `.output/` 目录，可直接部署到 Vercel、Netlify、Node.js 服务器等平台。

## 🎨 设计系统

素笺遵循传统中式美学，打造宁静致远的阅读体验。

### 色彩系统

| 变量名 | 颜色值 | 用途 |
|--------|--------|------|
| `--sujian-paper-base` | `#f7f4ed` | 主背景（宣纸色） |
| `--sujian-paper-light` | `#faf8f3` | 卡片背景 |
| `--sujian-paper-dark` | `#e8e4db` | 边框、分割线 |
| `--sujian-ink-primary` | `#2c2c2c` | 主要文字（墨色） |
| `--sujian-ink-secondary` | `#5a5a5a` | 次要文字 |
| `--sujian-cinnabar` | `#c9372e` | 朱砂红（印章、分隔线） |
| `--sujian-cyan` | `#4a7c7e` | 中式青（链接、标签） |

### 字体系统

- **衬线体**（宋体风格）：`'Noto Serif SC'`, `serif` - 用于标题、引用等强调内容
- **无衬线体**（黑体风格）：`'Noto Sans SC'`, `sans-serif` - 用于正文

**切换方式**：`Ctrl+Shift+F` 或通过页面右上角字体按钮

### 质感与层次

- **颗粒感**：SVG 噪点滤镜，背景层 (3%)、卡片层 (8%)、内容层 (15%)
- **阴影系统**：三层阴影 (`--sujian-shadow-sm/md/lg`) 营造纸张层次
- **中式元素**：窗棂纹边框、印章按钮、朱砂分隔线

## 📁 项目结构

```
Sujian/
├── app/                    # 应用核心目录
│   ├── components/         # Vue 组件
│   │   ├── global/        # 全局组件（字体切换器等）
│   │   └── Sujian*.vue    # 主题组件
│   ├── pages/             # 页面路由
│   │   ├── posts/         # 文章页面
│   │   ├── projects/      # 项目展示
│   │   ├── notes/         # 笔记页面
│   │   └── ...           # 其他页面
│   ├── layouts/           # 布局组件
│   ├── composables/       # 组合式函数
│   └── assets/           # 静态资源
├── public/               # 公共静态文件
├── server/               # 服务端 API（如需要）
├── .output/             # 构建输出目录
│   ├── server/          # 服务器入口文件
│   └── public/          # 静态资源
├── nuxt.config.ts       # Nuxt 配置文件
├── tailwind.config.ts   # Tailwind 配置（如有）
└── README.md           # 项目说明
```

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Nuxt** | 4.4+ | Vue 全栈框架 |
| **Vue** | 3.4+ | 前端 UI 库 |
| **Nuxt UI** | 4.6+ | UI 组件库 |
| **Tailwind CSS** | 4.2+ | 原子化 CSS 框架 |
| **TypeScript** | 5.9+ | 类型系统 |
| **@nuxtjs/i18n** | 10.2+ | 国际化 |
| **@nuxt/image** | 2.0+ | 图片优化 |
| **@nuxtjs/seo** | 5.1+ | SEO 优化 |
| **@vueuse/nuxt** | 14.2+ | Vue 工具集 |
| **markdown-it** | 14.1+ | Markdown 解析 |

## 📖 开发指南

### 开发模式

```bash
# 启动热重载开发服务器
pnpm dev

# 代码检查
pnpm lint

# 类型检查
pnpm typecheck
```

### 添加新页面

在 `app/pages/` 目录下创建 Vue 文件即可自动生成路由：

```vue
<!-- app/pages/about.vue -->
<template>
  <div>关于页面</div>
</template>
```

访问：http://localhost:3000/about

### 创建组件

组件应放在 `app/components/` 目录，支持自动导入：

```vue
<!-- app/components/SujianCard.vue -->
<script setup lang="ts">
interface Props {
  title: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="sujian-card">
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>
```

### 样式规范

- 使用 scoped CSS 或 Tailwind 工具类
- 主题颜色使用 CSS 变量：`var(--sujian-ink-primary)` 等
- 颗粒感通过全局滤镜应用：`filter: url(#sujian-noise)`

## 📦 构建产物说明

运行 `pnpm build` 后，构建产物位于 `.output/` 目录：

```
.output/
├── server/           # 服务端入口文件
│   ├── index.mjs     # 主入口
│   ├── chunks/       # 代码分块
│   └── node_modules/ # 依赖包
├── public/           # 静态资源
└── nitro.json        # Nitro 配置
```

### 下载预览构建

在 GitHub Releases 页面下载 `sujian-build.zip`：

```bash
# 解压
unzip sujian-build.zip -d ./sujian-preview

# 启动预览服务器（需要 Node.js 20+）
cd sujian-preview
node server/index.mjs
```

## 🚢 部署

### Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flaobinghu%2FSujian)

### 其他平台

```bash
# 构建项目
pnpm build

# 使用 pnpm preview 本地预览
pnpm preview
```

构建产物 `.output` 可直接部署到任何静态托管平台。如需服务端渲染功能，需部署到支持 Node.js 的平台（如 Vercel、Railway、Heroku 等）。

## 🏷️ 版本管理

本项目使用语义化版本（SemVer）：

- **主版本号**：不兼容的 API 修改
- **次版本号**：向后兼容的功能新增
- **修订号**：向后兼容的问题修复

### 创建 Release

```bash
# 创建新标签
git tag -a v1.0.0 -m "Release v1.0.0"

# 推送标签（触发 CI 自动构建）
git push origin v1.0.0
```

推送 `v*` 标签将自动触发 CI 工作流，构建并发布正式 Release。

## 🤝 贡献

欢迎贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。

### 开发规范

- 提交信息使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式
- 代码风格遵循 ESLint 配置
- TypeScript 严格模式

```bash
# 格式：type(scope): description
feat: 添加字体切换功能
fix: 修复移动端导航栏显示问题
refactor: 重构卡片组件样式
```

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证。

## 🙏 致谢

- [Nuxt](https://nuxt.com) - 优秀的全栈框架
- [Nuxt UI](https://ui.nuxt.com) - 精美的组件库
- [Tailwind CSS](https://tailwindcss.com) - 高效的 CSS 框架
- [Mix Space](https://mx-space.js.org) - 提供 API 支持

## 📮 支持

如有问题或建议，欢迎提交 [Issue](https://github.com/laobinghu/Sujian/issues) 或 [ Discussions](https://github.com/laobinghu/Sujian/discussions)。

---

<div align="center">
  <sub>Made with ❤️ and ☕ by <a href="https://github.com/laobinghu">laobinghu</a></sub>
</div>

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.

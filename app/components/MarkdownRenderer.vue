<script setup lang="ts">
import MarkdownIt, { type Options } from 'markdown-it'

interface Props {
  content?: string
  options?: Options
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  options: () => ({
    html: false,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
    typographer: true
  })
})

const md = new MarkdownIt(props.options)

const renderedContent = computed(() => {
  return md.render(props.content)
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="markdown-body"
    v-html="renderedContent"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>

<style scoped>
.markdown-body {
  /* 基础样式 */
  line-height: 1.8;
  color: var(--sujian-ink-primary);
}

/* 标题样式 */
.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-family: var(--font-serif);
  font-weight: 600;
  color: var(--sujian-ink-primary);
}

.markdown-body :deep(h1) {
  font-size: 2rem;
  border-bottom: 1px solid var(--sujian-paper-dark);
  padding-bottom: 0.3em;
}

.markdown-body :deep(h2) {
  font-size: 1.5rem;
  border-bottom: 1px solid var(--sujian-paper-dark);
  padding-bottom: 0.3em;
}

.markdown-body :deep(h3) {
  font-size: 1.25rem;
}

/* 段落和文本 */
.markdown-body :deep(p) {
  margin: 1em 0;
  text-indent: 2em;
}

.markdown-body :deep(strong) {
  font-weight: 600;
  color: var(--sujian-ink-primary);
}

.markdown-body :deep(em) {
  font-style: italic;
}

/* 链接 */
.markdown-body :deep(a) {
  color: var(--sujian-cyan);
  text-decoration: none;
  transition: color 0.2s ease;
}

.markdown-body :deep(a:hover) {
  color: var(--sujian-cinnabar);
  text-decoration: underline;
}

/* 代码块 */
.markdown-body :deep(code) {
  background-color: var(--sujian-paper-light);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9em;
  color: var(--sujian-cinnabar);
}

.markdown-body :deep(pre) {
  background-color: var(--sujian-paper-light);
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
  border: 1px solid var(--sujian-paper-dark);
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
  color: var(--sujian-ink-primary);
}

/* 列表 */
.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 1em 0;
  padding-left: 2em;
}

.markdown-body :deep(li) {
  margin: 0.5em 0;
}

/* 引用 */
.markdown-body :deep(blockquote) {
  margin: 1em 0;
  padding: 0.5em 1em;
  border-left: 3px solid var(--sujian-cinnabar);
  background-color: var(--sujian-paper-light);
  color: var(--sujian-ink-secondary);
}

/* 分隔线 */
.markdown-body :deep(hr) {
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--sujian-cinnabar) 20%,
    var(--sujian-cinnabar) 80%,
    transparent
  );
  opacity: 0.3;
  margin: 2em 0;
}

/* 图片 */
.markdown-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 1em 0;
}

/* 表格 */
.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: 0.5em;
  border: 1px solid var(--sujian-paper-dark);
  text-align: left;
}

.markdown-body :deep(th) {
  background-color: var(--sujian-paper-light);
  font-weight: 600;
}
</style>

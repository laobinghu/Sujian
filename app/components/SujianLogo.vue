<script setup lang="ts">
// 素笺 Logo - 基于中文"素笺"的简洁设计
const logoSvg = `
<svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="28" font-family="'Noto Serif SC', serif" font-size="24" font-weight="600" fill="var(--sujian-ink-primary)">素笺</text>
  <text x="58" y="28" font-family="'Noto Sans SC', sans-serif" font-size="12" fill="var(--sujian-ink-secondary)">Sujian</text>
</svg>
`
</script>

<template>
  <div
    class="sujian-logo"
    v-html="logoSvg"
  />
</template>

<style scoped>
.sujian-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--sujian-ink-primary);
  transition: opacity 0.2s ease;
}

.sujian-logo:hover {
  opacity: 0.8;
}

.sujian-logo :deep(svg) {
  width: 120px;
  height: auto;
}
</style>

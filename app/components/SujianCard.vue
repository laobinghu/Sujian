<script setup lang="ts">
import { ref } from 'vue'

const isHovered = ref(false)
</script>

<template>
  <div
    class="sujian-card"
    :class="{ 'is-hovered': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- 四角窗棂纹装饰 -->
    <div
      class="corner-decoration corner-top-left"
      aria-hidden="true"
    />
    <div
      class="corner-decoration corner-top-right"
      aria-hidden="true"
    />
    <div
      class="corner-decoration corner-bottom-left"
      aria-hidden="true"
    />
    <div
      class="corner-decoration corner-bottom-right"
      aria-hidden="true"
    />

    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SujianCard'
}
</script>

<style scoped>
.sujian-card {
  position: relative;
  background-color: var(--sujian-paper-light);
  border-radius: 4px;
  padding: 1.5rem;
  box-shadow: var(--sujian-shadow-sm);
  transition: all 0.3s ease;
  overflow: hidden;
}

/* 使用伪元素为背景添加噪点，不影响内容 */
.sujian-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  filter: url(#sujian-noise);
  opacity: 0.04;
  pointer-events: none;
  z-index: 0;
}

.sujian-card > * {
  position: relative;
  z-index: 1;
}

.sujian-card.is-hovered {
  box-shadow: var(--sujian-shadow-md);
  transform: translateY(-2px);
}

.sujian-card.is-hovered::before {
  opacity: 0.06;
}

/* 四角窗棂纹装饰 */
.corner-decoration {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid var(--sujian-cinnabar);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.sujian-card.is-hovered .corner-decoration {
  opacity: 0.6;
}

.corner-top-left {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

.corner-top-right {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
}

.corner-bottom-left {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
}

.corner-bottom-right {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}

/* 移动端适配：小屏幕时简化窗棂纹 */
@media (max-width: 768px) {
  .sujian-card {
    padding: 1rem;
  }

  .corner-decoration {
    width: 8px;
    height: 8px;
  }
}
</style>

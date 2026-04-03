<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

type FontMode = 'serif' | 'sans' | 'system'

const STORAGE_KEY = 'sujian-font-pref'
const SHORTCUT = 'Ctrl+Shift+F'

// 字体选项定义
const fontOptions = [
  { value: 'serif' as FontMode, label: '雅阅', description: 'Noto Serif SC（宋体）' },
  { value: 'sans' as FontMode, label: '简阅', description: 'Noto Sans SC（黑体）' },
  { value: 'system' as FontMode, label: '系统默认', description: '跟随系统设置' }
]

// 当前选中的字体
const currentFont = ref<FontMode>('sans')

// 下拉菜单状态
const isOpen = ref(false)

// 从 localStorage 加载保存的字体偏好
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && ['serif', 'sans', 'system'].includes(saved)) {
    currentFont.value = saved as FontMode
    applyFont(saved as FontMode)
  }

  // 监听键盘快捷键
  document.addEventListener('keydown', handleKeydown)
})

// 清理事件监听
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 应用字体到页面
function applyFont(mode: FontMode) {
  const html = document.documentElement

  switch (mode) {
    case 'serif':
      html.classList.add('font-serif')
      html.classList.remove('font-sans')
      break
    case 'sans':
      html.classList.add('font-sans')
      html.classList.remove('font-serif')
      break
    case 'system':
      html.classList.remove('font-serif', 'font-sans')
      break
  }
}

// 切换字体
function switchFont(mode: FontMode) {
  currentFont.value = mode
  localStorage.setItem(STORAGE_KEY, mode)
  applyFont(mode)
  isOpen.value = false
}

// 键盘快捷键处理
function handleKeydown(event: KeyboardEvent) {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'f') {
    event.preventDefault()
    toggleNextFont()
  }
}

// 循环切换到下一个字体
function toggleNextFont() {
  const currentIndex = fontOptions.findIndex(opt => opt.value === currentFont.value)
  const nextIndex = (currentIndex + 1) % fontOptions.length
  const nextFont = fontOptions[nextIndex]?.value as FontMode
  switchFont(nextFont)
}

// 获取当前字体的标签
const currentLabel = computed(() => {
  const option = fontOptions.find(opt => opt.value === currentFont.value)
  return option ? option.label : '字体'
})
</script>

<template>
  <UDropdownMenu
    v-model:open="isOpen"
    :modal="false"
    :items="fontOptions.map(option => ({
      label: option.label,
      description: option.description,
      click: () => switchFont(option.value),
      checked: currentFont === option.value,
      type: 'checkbox' as const
    }))"
    :content="{ align: 'end' }"
    :ui="{ content: 'w-48' }"
  >
    <UButton
      :aria-label="`当前字体: ${currentLabel}，按 ${SHORTCUT} 切换`"
      icon="i-lucide-type"
      size="xs"
      variant="soft"
      color="neutral"
      :class="[
        isOpen && 'ring-2 ring-inset ring-sujian-cinnabar',
        'border border-sujian-paper-dark hover:border-sujian-cinnabar'
      ]"
    >
      <span class="hidden sm:inline">{{ currentLabel }}</span>
    </UButton>
  </UDropdownMenu>
</template>

<style scoped>
/* 自定义边框颜色支持 */
:deep(.u-button) {
  border-color: var(--sujian-paper-dark);
  transition: border-color 0.2s ease;
}

:deep(.u-button:hover) {
  border-color: var(--sujian-cinnabar);
}

/* 激活状态边框色 */
:deep(.u-button.ring-2) {
  border-color: var(--sujian-cinnabar);
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

type FontMode = 'serif' | 'sans'

const STORAGE_KEY = 'sujian-font-pref'

const fontOptions = [
  { value: 'sans' as FontMode, label: '简阅' },
  { value: 'serif' as FontMode, label: '雅阅' }
]

const currentFont = ref<FontMode>('sans')
const isOpen = ref(false)

onMounted(() => {
  if (import.meta.client) {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && ['serif', 'sans'].includes(saved)) {
      currentFont.value = saved as FontMode
      applyFont(saved as FontMode)
    }
  }
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

function applyFont(mode: FontMode) {
  if (typeof document === 'undefined') return
  document.body.classList.remove('font-serif', 'font-sans')
  document.body.classList.add(`font-${mode}`)
}

function switchFont(mode: FontMode) {
  currentFont.value = mode
  localStorage.setItem(STORAGE_KEY, mode)
  applyFont(mode)
  isOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'f') {
    event.preventDefault()
    const idx = fontOptions.findIndex(o => o.value === currentFont.value)
    const next = fontOptions[(idx + 1) % fontOptions.length]
    if (next) {
      switchFont(next.value)
    }
  }
}

const currentLabel = computed(() => {
  const opt = fontOptions.find(o => o.value === currentFont.value)
  return opt?.label || '字体'
})

const menuItems = computed(() => [
  fontOptions.map(option => ({
    label: option.label,
    icon: currentFont.value === option.value ? 'i-lucide-check' : undefined,
    onClick: () => switchFont(option.value)
  }))
])
</script>

<template>
  <UDropdownMenu
    v-model:open="isOpen"
    :items="menuItems"
    :modal="false"
  >
    <UButton
      :aria-label="`当前字体: ${currentLabel}，点击切换`"
      icon="i-lucide-type"
      size="xs"
      variant="soft"
      color="neutral"
    >
      <span class="hidden sm:inline">{{ currentLabel }}</span>
    </UButton>
  </UDropdownMenu>
</template>

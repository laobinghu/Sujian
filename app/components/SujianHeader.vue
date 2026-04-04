<script setup lang="ts">
const menuItems = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/posts' },
  { label: '日记', to: '/notes' },
  { label: '友链', to: '/friends' },
  { label: '项目', to: '/projects' },
  { label: '动态', to: '/recently' },
  { label: '时间线', to: '/timeline' },
  { label: '一言', to: '/says' }
]

const isMobileMenuOpen = ref(false)
</script>

<template>
  <header class="sujian-header">
    <div class="sujian-header-inner">
      <div class="sujian-header-left">
        <NuxtLink
          to="/"
          class="sujian-logo-link"
        >
          <SujianLogo class="sujian-logo" />
        </NuxtLink>

        <nav class="sujian-nav">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="nav-link"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <div class="sujian-header-right">
        <UColorModeButton />

        <FontSwitcher />

        <button
          class="mobile-menu-btn"
          aria-label="菜单"
          @click="isMobileMenuOpen = true"
        >
          <UIcon
            name="i-lucide-menu"
            class="menu-icon"
          />
        </button>
      </div>
    </div>

    <!-- 移动端菜单遮罩 -->
    <Transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-overlay"
        @click="isMobileMenuOpen = false"
      />
    </Transition>

    <!-- 移动端菜单面板 -->
    <Transition name="slide">
      <nav
        v-if="isMobileMenuOpen"
        class="mobile-menu"
      >
        <div class="mobile-menu-header">
          <h2 class="mobile-menu-title">
            导航菜单
          </h2>
          <button
            class="mobile-close-btn"
            aria-label="关闭菜单"
            @click="isMobileMenuOpen = false"
          >
            <UIcon
              name="i-lucide-x"
              class="close-icon"
            />
          </button>
        </div>

        <div class="mobile-menu-content">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="mobile-nav-link"
            @click="isMobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.sujian-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--sujian-paper);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
}

.sujian-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sujian-header-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.sujian-logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.sujian-logo {
  height: 1.75rem;
}

.sujian-nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--sujian-ink-secondary);
  text-decoration: none;
  padding: 0.375rem 0;
  position: relative;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--sujian-cinnabar);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav-link:hover {
  color: var(--sujian-ink-primary);
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-link.router-link-active {
  color: var(--sujian-cinnabar);
}

.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.sujian-header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: transparent;
  color: var(--sujian-ink-secondary);
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.mobile-menu-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.menu-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* 移动端菜单 */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 50;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 18rem;
  background-color: var(--sujian-paper);
  z-index: 51;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.mobile-menu-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--sujian-ink-primary);
  margin: 0;
}

.mobile-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  color: var(--sujian-ink-secondary);
  cursor: pointer;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.mobile-close-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.close-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.mobile-menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--sujian-ink-secondary);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s, color 0.2s;
}

.mobile-nav-link:hover {
  background-color: rgba(0, 0, 0, 0.04);
  color: var(--sujian-ink-primary);
}

.mobile-nav-link.router-link-active {
  color: var(--sujian-cinnabar);
  background-color: rgba(211, 66, 60, 0.08);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .sujian-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>

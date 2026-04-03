<script setup lang="ts">
// 导航菜单项
const menuItems = [
  {
    label: '首页',
    to: '/'
  },
  {
    label: '文章',
    to: '/posts'
  },
  {
    label: '日记',
    to: '/notes'
  },
  {
    label: '友链',
    to: '/friends'
  },
  {
    label: '项目',
    to: '/projects'
  },
  {
    label: '动态',
    to: '/recently'
  },
  {
    label: '时间线',
    to: '/timeline'
  },
  {
    label: '一言',
    to: '/says'
  }
]
</script>

<template>
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
</template>

<style scoped>
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
</style>

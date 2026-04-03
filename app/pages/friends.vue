<template>
  <div class="page-container">
    <header class="page-header">
      <h1 class="page-title">
        友链
      </h1>
      <p class="page-subtitle">
        与这些优秀站点互换链接
      </p>
      <div class="header-divider" />
    </header>

    <main class="friends-list">
      <SujianCard>
        <div class="content-wrapper">
          <h2 class="section-title">
            友情链接
          </h2>
          <div class="friends-grid">
            <a
              v-for="friend in friends"
              :key="friend.name"
              :href="friend.url"
              :title="friend.description"
              class="friend-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="friend-avatar">
                <img
                  :src="friend.avatar"
                  :alt="friend.name"
                  class="avatar-img"
                >
              </div>
              <div class="friend-info">
                <h3 class="friend-name">{{ friend.name }}</h3>
                <p class="friend-desc">{{ friend.description }}</p>
              </div>
            </a>
          </div>

          <div class="add-friend">
            <h2 class="section-title">
              申请友链
            </h2>
            <p class="add-friend-text">
              欢迎与本站交换友链，请在您的站点添加以下信息后，通过邮件或评论联系我。
            </p>
            <div class="site-info">
              <p><strong>名称：</strong>素笺</p>
              <p><strong>地址：</strong>https://example.com</p>
              <p><strong>描述：</strong>以纸为媒，以墨为韵，记录技术与设计的思考</p>
            </div>
          </div>
        </div>
      </SujianCard>
    </main>
  </div>
</template>

<script setup lang="ts">
interface Friend {
  name: string
  url: string
  avatar: string
  description: string
}

const friends: Friend[] = [
  {
    name: 'Mix Space',
    url: 'https://mx-space.js.org',
    avatar: '/images/friends/mx-space.png',
    description: '现代化的博客系统框架'
  },
  {
    name: 'Nuxt',
    url: 'https://nuxt.com',
    avatar: '/images/friends/nuxt.png',
    description: '直观的 Vue 框架'
  }
]

useSeoMeta({
  title: '友链 - 素笺',
  description: '友情链接站点列表',
  ogTitle: '友链 - 素笺',
  ogDescription: '友情链接站点列表'
})
</script>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  color: var(--sujian-ink-primary);
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--sujian-ink-secondary);
  margin: 0;
}

.header-divider {
  width: 60px;
  height: 2px;
  background-color: var(--sujian-cinnabar);
  margin: 1.5rem auto 0;
  opacity: 0.3;
}

.content-wrapper {
  padding: 2rem 1.5rem;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--sujian-ink-primary);
  margin: 0 0 1.5rem 0;
  font-weight: 600;
}

.section-title:not(:first-child) {
  margin-top: 3rem;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.friend-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--sujian-paper-dark);
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.friend-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--sujian-shadow-md);
}

.friend-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.friend-info {
  flex: 1;
  min-width: 0;
}

.friend-name {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 600;
  color: var(--sujian-ink-primary);
  margin: 0 0 0.25rem 0;
}

.friend-desc {
  font-size: 0.875rem;
  color: var(--sujian-ink-secondary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.add-friend-text {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--sujian-ink-secondary);
  margin: 0 0 1.5rem 0;
}

.site-info {
  padding: 1rem 1.5rem;
  background-color: var(--sujian-paper-base);
  border-radius: 4px;
  border-left: 3px solid var(--sujian-cinnabar);
}

.site-info p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: var(--sujian-ink-primary);
}

.site-info strong {
  color: var(--sujian-ink-primary);
}

@media (max-width: 768px) {
  .page-container {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .friends-grid {
    grid-template-columns: 1fr;
  }
}
</style>

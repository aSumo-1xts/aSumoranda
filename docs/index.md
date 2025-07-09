---
layout: home

title: Home
description: ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ

hero:
  name: "aSumoranda"
  tagline: "↓↓↓ Recomended Posts ↓↓↓"
  image:
    src: cover01.webp
    alt: aSumoranda

permalink: "https://blog.1xtelescope.com"
---

## Recent posts

<script lang="ts" setup>
    import { data as posts } from "./.vitepress/posts.data";
    import moment from 'moment';

    const recentPosts = posts.slice(0, 4); // Get the 3 most recent posts
</script>

<div class="recent-posts-container">
    <div v-for="post of recentPosts" class="recent-post-banner">
        <a :href="`${post.url}`" class="post-title">{{ post.frontmatter.title }}</a>
        <span class="post-date"> - {{ moment(post.frontmatter.date).format('YYYY-MM-DD') }}</span>
    </div>
</div>

<style scoped>
.recent-posts-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.recent-post-banner {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-title {
    font-weight: bold;
    font-size: 1.2rem;
    color: #007acc;
    text-decoration: none;
}

.post-title:hover {
    text-decoration: underline;
}

.post-date {
    font-size: 0.9rem;
    color: #555;
}
</style>
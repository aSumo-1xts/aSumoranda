<script lang="ts" setup>
import { data as posts } from "../posts.data";
import moment from "moment";
const props = defineProps(["tag"]);
let taggedPosts = posts.filter((page) =>
  page.frontmatter.tags
    .toString()
    .replaceAll(" ", "")
    .toLowerCase()
    .includes(props.tag),
);
</script>

<template>
  <ul>
    <li v-for="post of taggedPosts">
      <a :href="`${post.url}`" class="font-semibold text-lg">{{
        post.frontmatter.title
      }}</a>
      <span class="text-sm">
        - {{ moment(post.frontmatter.date).format("YYYY-MM-DD") }}</span
      >
    </li>
  </ul>
</template>

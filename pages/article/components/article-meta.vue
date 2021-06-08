<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following,
      }"
      @click="handleEdit"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Edit Article
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited,
      }"
      @click="handleDelete"
    >
      <i class="ion-heart"></i>
      &nbsp; Delete Article
    </button>
  </div>
</template>

<script>
import { deleteArticle } from "@/api/article";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleEdit() {
      this.$router.push(`/editor/${this.article.slug}`);
    },
    async handleDelete() {
      try {
        await deleteArticle(this.article.slug);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>

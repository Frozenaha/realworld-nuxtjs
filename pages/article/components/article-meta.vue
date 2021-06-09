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
    <template v-if="article.author.username === user.username">
      <button class="btn btn-sm btn-outline-primary" @click="handleEdit">
        <i class="ion-plus-round"></i>
        &nbsp; Edit Article
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-danger" @click="handleDelete">
        <i class="ion-heart"></i>
        &nbsp; Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.author.following,
        }"
        @click="handleFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{ article.author.following?"unFollow":"Follow"}} {{ article.author.username }}
      </button>
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited,
        }"
        @click="handleFavorite"
      >
        <i class="ion-plus-round"></i>
        &nbsp;{{ article.favorited?'unFavorite':'Favorite'}}  Article({{ article.favoritesCount }})
      </button>
    </template>
  </div>
</template>

<script>
import { deleteArticle } from "@/api/article";
import { followUser, unFollowUser } from "@/api/user";
import { addFavorite, deleteFavorite } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
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
    async handleFollow() {
      try {
        this.article.author.following
          ? await unFollowUser(this.article.author.username)
          : await followUser(this.article.author.username);
        this.article.author.following = !this.article.author.following;
      } catch (err) {
        console.log(err);
      }
    },
    async handleFavorite() {
      if (this.article.favorited) {
        // 取消点赞
        await deleteFavorite(this.article.slug);
        this.article.favorited = false;
        this.article.favoritesCount += -1;
      } else {
        // 添加点赞
        await addFavorite(this.article.slug);
        this.article.favorited = true;
        this.article.favoritesCount += 1;
      }
    },
  },
};
</script>

<style></style>

<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>

            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-if="user.username !== currentUser.username"
              @click="handleFollow"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ user.following ? "unFollow" : "follow" }}
              {{ user.username }}
            </button>
            <nuxt-link to="/settings" v-else>
              <button class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-plus-round"></i>
                &nbsp; edit Profile Setting
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" @click="handleTab('author')">
                <a
                  class="nav-link"
                  :class="{
                    active: tab === 'author',
                  }"
                  >My Articles</a
                >
              </li>
              <li class="nav-item" @click="handleTab('favorited')">
                <a
                  class="nav-link"
                  :class="{
                    active: tab === 'favorited',
                  }"
                  >Favorited Articles</a
                >
              </li>
            </ul>
          </div>
          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <article-item :article="article"></article-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, followUser, unFollowUser } from "@/api/user";
import { getArticles } from "@/api/article";
import { mapState } from "vuex";
import ArticleItem from "../article/components/article-item";
export default {
  middleware: "authenticated",
  name: "UserProfile",
  async asyncData({ params }) {
    const [articleRes, userRes] = await Promise.all([
      getArticles({
        limit: 1000,
        offset: 0,
        author: params.username,
      }),
      getUserInfo(params.username),
    ]);
    const tab = "author";
    const { articles } = articleRes.data;
    const { profile } = userRes.data;
    return {
      user: profile,
      articles,
      tab,
    };
  },
  components: {
    ArticleItem,
  },
  computed: {
    ...mapState({ currentUser: "user" }),
  },
  methods: {
    async handleFollow() {
      try {
        this.user.following
          ? await unFollowUser(this.user.username)
          : await followUser(this.user.username);
        this.user.following = !this.user.following;
      } catch (err) {
        console.log(err);
      }
    },
    async handleTab(tab) {
      this.tab=tab
      const param = {
        limit: 1000,
        offset: 0,
        [tab]: this.user.username,
      };
      try {
        const {
          data: { articles },
        } = await getArticles(param);
        this.articles = articles;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>

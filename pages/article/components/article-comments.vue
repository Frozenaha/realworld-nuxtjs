<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment"
          required
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" type="button" @click="handleAddComment">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD, YYYY")
        }}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button v-if="comment.author.username===user.username" class="btn btn-sm btn-danger" type="button" @click="handleDeleteComment(comment.id)">
          Delete Comment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment, deleteComment } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [], // 文章列表
      comment: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments;
  },
  methods: {
    async handleAddComment() {
      const data = {
        comment: {
          body:this.comment
        },
      };
      try {
        await addComment(data, this.article.slug);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    async handleDeleteComment(id) {
      try {
        await deleteComment(this.article.slug, id);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>

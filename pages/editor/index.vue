<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <ul class="error-messages">
          <template v-for="(messages, field) in errors">
            <li v-for="(message, index) in messages" :key="index">
              {{ field }} {{ message }}
            </li>
          </template>
        </ul>
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  required
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  required
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  required
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.tagList"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags, 逗号分割"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="submit"
              >
                {{ urlParams.slug ? "Update" : "Publish" }}Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from "@/api/article";
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "EditorIndex",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: "",
      },
      errors: {}, // 错误信息
    };
  },
  computed: {
    urlParams() {
      return this.$router.history.current.params || {};
    },
  },
  async mounted() {
    if (this.urlParams.slug) {
      try {
        const { data: { article } = {} } = await getArticle(
          this.urlParams.slug
        );
        this.article = {
          ...article,
          tagList: article.tagList.join(","),
        };
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    async submit() {
      const articleData = {
        ...this.article,
        tagList: this.article.tagList ? this.article.tagList.split(",") : [],
      };
      const data = {
        article: articleData,
      };
      try {
        const { data: { article } = {} } = this.urlParams.slug
          ? await updateArticle(data, this.urlParams.slug)
          : await createArticle(data);
        this.$router.push(`/article/${article.slug}`);
      } catch (err) {
        console.log(err);
        this.errors = err.response.data.errors;
      }
    },
  },
};
</script>

<style></style>

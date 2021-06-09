<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  disabled
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                type="button"
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateSetting"
              >
                Update Settings
              </button>
              <button
                type="button"
                class="btn btn-lg btn-danger pull-xs-left"
                @click="logout"
              >
                logout
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser, getCurrentUserInfo } from "@/api/user";
import { mapMutations } from "vuex";
export default {
  middleware: "authenticated",
  name: "SettingsIndex",
  async asyncData() {
    const { data: { user } = {} } = await getCurrentUserInfo();
    return {
      user,
    };
  },
  methods: {
    async updateSetting() {
      try {
        const {
          data: { user },
        } = await updateUser(this.user);
        this.updateNewUser(user)
        this.$router.push(`/profile/${user.username}`);
      } catch (e) {
        console.log(e);
      }
    },
    ...mapMutations(['updateNewUser','logout'])
  },
};
</script>

<style></style>

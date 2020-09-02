<template>
  <v-app>
    <app-error />
    <app-notification />

    <section class="toolbar">
      <v-toolbar color="primary" dark fixed>
        <v-toolbar-title>Events Creator</v-toolbar-title>

        <v-spacer />

        <v-toolbar-items>
          <v-btn text to="/events">
            <v-icon left>mdi-calendar</v-icon>Events
          </v-btn>
          <v-btn v-if="!user" text to="/login">
            <v-icon left>mdi-account</v-icon>Login
          </v-btn>
          <v-btn v-else text @click="$store.dispatch('auth/logout')">
            <v-icon left>mdi-logout</v-icon>Logout
          </v-btn>
        </v-toolbar-items>

        <!-- <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
        </template>-->
      </v-toolbar>
    </section>

    <v-main fluid class="pb-5 mb-5">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <v-icon class="mr-2">mdi-copyright</v-icon>
      <span class="caption">Ved 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (!!user) this.$store.dispatch("auth/autoLogin", user);
    });
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
textarea {
  resize: none;
}
</style>

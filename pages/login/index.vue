<template>
  <v-layout row wrap>
    <v-flex xs12 sm4 offset-sm4 mt-12>
      <v-card>
        <v-card-title class="grey lighten-4 pb-3">Sign In</v-card-title>
        <v-form ref="form" @submit.prevent="login">
          <v-card-text class="pt-3">
            <v-text-field
              label="E-Mail Address"
              :rules="[rules.required, rules.email]"
              v-model="input.email"
            />
            <v-text-field
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              :append-icon="!show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              label="Password"
              :rules="[rules.required]"
              v-model="input.password"
            />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :loading="$store.getters['loading/btnLoading']"
              outlined
              color="green"
              type="submit"
            >Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    show: false,
    input: {
      email: "",
      password: ""
    },
    rules: {
      required: value => !!value || "Required.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    login() {
      if (!this.$refs.form.validate()) return;
      this.$store.dispatch("auth/login", this.input);
    }
  }
};
</script>
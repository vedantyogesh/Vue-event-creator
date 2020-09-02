<template lang="html">
  <v-snackbar
    v-model="open"
    bottom right
    multi-line
    color="red"
    :timeout="timeout">
  {{ error }}
    <v-btn color="white" text @click="close" >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      timeout: 6000,
      text: this.$store.getters["alerts/error"]
    };
  },
  computed: {
    error() {
      return this.$store.getters["alerts/error"];
    }
  },
  watch: {
    error(data) {
      if (data) {
        this.open = true;
        setTimeout(() => {
          this.open = false;
          this.$store.dispatch("alerts/clearError");
        }, 10000);
      }
    }
  },
  methods: {
    close() {
      this.open = false;
      this.$store.dispatch("alerts/clearError");
    }
  }
};
</script>

<style lang="sass">
</style>

<template lang="html">
  <v-snackbar
    v-model="open"
    top right
    multi-line
    color="green"
    :timeout="timeout">
  {{ notification }}
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
      text: this.$store.getters["alerts/notification"]
    };
  },
  computed: {
    notification() {
      return this.$store.getters["alerts/notification"];
    }
  },
  watch: {
    notification(data) {
      if (data) {
        this.open = true;
        setTimeout(() => {
          this.$store.dispatch("alerts/clearNotification");
          this.open = false;
        }, 10000);
      }
    }
  },
  methods: {
    close() {
      this.open = false;
      this.$store.dispatch("alerts/clearNotification");
    }
  }
};
</script>

<style lang="sass">
</style>

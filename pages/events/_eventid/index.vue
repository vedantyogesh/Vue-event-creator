<template>
  <v-layout row wrap>
    <v-flex
      key="3"
      class="text-center mt-12 pt-12"
      xs12
      v-if="$store.getters['loading/pageLoading']"
    >
      <v-progress-circular color="orange" :size="50" :width="3" indeterminate></v-progress-circular>
      <span class="ml-3">Loading ...</span>
    </v-flex>
    <v-flex v-else>
      <event />
    </v-flex>
  </v-layout>
</template>

<script>
import event from "@/components/Events/Single";

export default {
  components: {
    event
  },
  created() {
    const id = this.$route.params.eventid;
    this.$store.dispatch("events/single/getEvent", { id: id });
  }
};
</script>
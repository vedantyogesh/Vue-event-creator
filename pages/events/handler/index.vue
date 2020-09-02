<template>
  <v-layout row wrap>
    <v-fade-transition mode="out-in">
      <v-flex
        class="text-center"
        key="1"
        xs12
        sm4
        mt-5
        offset-sm4
        v-if="!$store.getters['loading/pageLoading'] && event"
      >
        <p
          class="subtitle-1 font-italic"
          v-if="event.verified === true"
        >This event has been accepted.</p>
        <p
          class="subtitle-1 font-italic"
          v-else-if="event.verified === false"
        >This event has been declined.</p>
        <eventcard v-else />
      </v-flex>
      <v-flex
        class="text-center mt-12 pt-12"
        key="2"
        v-else-if="!$store.getters['loading/pageLoading'] && !event"
      >
        <v-btn outlined color="red" to="/">Take me Home</v-btn>
      </v-flex>
      <v-flex key="3" class="text-center mt-12 pt-12" xs12 v-else>
        <v-progress-circular color="orange" :size="50" :width="3" indeterminate></v-progress-circular>
        <span class="ml-3">Loading ...</span>
      </v-flex>
    </v-fade-transition>
  </v-layout>
</template>

<script>
import eventcard from "@/components/Events/Handler";

export default {
  components: {
    eventcard
  },
  computed: {
    event() {
      return this.$store.getters["events/handler/event"];
    }
  },
  created() {
    const data = this.$route.query;
    this.$store.dispatch("events/handler/getEvent", data);
  }
};
</script>
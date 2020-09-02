<template>
  <v-layout row wrap>
    <v-fade-transition mode="out-in">
      <v-flex key="1" xs12 v-if="!$store.getters['loading/pageLoading']">
        <v-card>
          <calendar />
        </v-card>
      </v-flex>
      <v-flex key="2" class="text-center mt-12 pt-12" xs12 v-else>
        <v-progress-circular color="orange" :size="50" :width="3" indeterminate></v-progress-circular>
        <span class="ml-3">Loading ...</span>
      </v-flex>
    </v-fade-transition>
  </v-layout>
</template>

<script>
import calendar from "@/components/Events/Calendar";

export default {
  components: {
    calendar
  },
  created() {
    this.$store.dispatch("events/get/getEvents");
  }
};
</script>

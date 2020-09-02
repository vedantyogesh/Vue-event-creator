<template>
  <v-card>
    <v-card-title class="grey lighten-4 pb-3">Event Details</v-card-title>
    <v-card-text class="mt-3">
      <p class="title" :style="{color: event.color}">{{event.name}} ({{event.venue.title}})</p>
      <p class="subtitle-1 black--text">{{event.details}}</p>
      <p
        class="subtitle-1"
      >{{$moment(event.start).format('DD/MM/YY HH:MM')}} - {{$moment(event.end).format('DD/MM/YY HH:MM')}}</p>
      <p class="caption mb-0">{{event.providers.map(e => e.title).join()}}</p>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn
        :loading="$store.getters['loading/btnLoading']"
        color="red"
        text
        @click="takeAction(false)"
      >
        <v-icon left>mdi-close</v-icon>Decline
      </v-btn>
      <v-spacer />
      <v-btn
        :loading="$store.getters['loading/btnLoading']"
        color="green"
        text
        @click="takeAction(true)"
      >
        <v-icon left>mdi-check</v-icon>Accept
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    event() {
      return this.$store.getters["events/handler/event"];
    }
  },
  methods: {
    takeAction(bool) {
      this.$store.dispatch("events/handler/eventAction", bool);
    }
  }
};
</script>
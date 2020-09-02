<template>
  <div>
    <div class="text-center">
      <v-btn color="amber accent-4" to="/events" outlined>Back To Calendar</v-btn>
    </div>
    <v-layout row wrap class="pt-5 pa-3">
      <v-card class="mx-auto" width="700px">
        <v-card-title
          :style="{backgroundColor: event.color}"
          class="white--text pb-3"
          primary-title
        >{{event.name}}</v-card-title>
        <v-card-text class="mt-2 mx-2 black--text">
          <v-layout row wrap>
            <v-flex xs6 class="pt-4 d-flex flex-row align-center">
              <div class="pr-3">
                <v-icon>mdi-clock-outline</v-icon>
              </div>
              <p class="mb-0">
                {{dateToString(event.start)}} - {{dateToString(event.end)}}
                <br />
                <span
                  class="grey--text text--darken-2"
                >{{timeToString(event.start)}} - {{timeToString(event.end)}}</span>
              </p>
            </v-flex>
            <v-flex xs6 class="pt-4 d-flex flex-row align-center">
              <div class="pr-3">
                <v-icon>mdi-map-marker</v-icon>
              </div>
              <p class="mb-0">{{event.venue.title}}</p>
            </v-flex>
            <v-flex xs12 class="pt-5 d-flex flex-row align-start">
              <div class="pr-3">
                <v-icon>mdi-text-subject</v-icon>
              </div>
              <p class="mb-0 pr-5 text-justify">{{event.details}}</p>
            </v-flex>
            <v-flex
              xs12
              class="pt-5 d-flex flex-row align-center"
              v-if="$store.getters['auth/user']"
            >
              <div class="pr-3">
                <v-icon>mdi-cloud-upload-outline</v-icon>
              </div>
              <div>
                <uploader
                  color="green darken-1"
                  buttonText="Upload Photos"
                  accept="image/*"
                  :id="event.id"
                  type="image"
                />
                <uploader
                  color="blue darken-1"
                  buttonText="Upload Files"
                  accept=".pdf"
                  :id="event.id"
                  type="file"
                />
              </div>
            </v-flex>
            <v-flex
              v-if="event.files != undefined && event.files.length != 0"
              xs12
              class="pt-5 d-flex flex-row align-center"
            >
              <div class="pr-3">
                <v-icon>mdi-file-document-outline</v-icon>
              </div>
              <v-list>
                <v-flex
                  xs12
                  v-for="(ev,i) in event.files"
                  :key="i"
                  :class="['d-block' ,'text-truncate',{'truncateWidth': $vuetify.breakpoint.smAndDown}]"
                >
                  <v-list-item @click="openLink(ev.url)" two-line>
                    <v-list-item-content>
                      <v-list-item-title>{{ev.name}}</v-list-item-title>
                      <v-list-item-subtitle>{{ev.date}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>
              </v-list>
            </v-flex>
            <v-flex
              v-if="event.images != undefined && event.images.length != 0"
              xs12
              class="pt-5 d-flex flex-row align-center"
            >
              <div class="pr-3">
                <v-icon>mdi-image-filter</v-icon>
              </div>
              <div class="d-flex flex-row" v-viewer>
                <img class="d-img mx-2" :src="ev.url" v-for="(ev,i) in event.images" :key="i" alt />
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import uploader from "@/components/Globals/Uploader";
import "viewerjs/dist/viewer.css";
export default {
  components: {
    uploader
  },
  data: () => ({
    event: null
  }),
  created() {
    this.event = this.$store.getters["events/single/event"];
  },
  methods: {
    dateToString: function(date) {
      return this.$moment(date).format("LL");
    },
    timeToString: function(date) {
      return this.$moment(date).format("LT");
    },
    openLink(url) {
      window.location = url;
    }
  }
};
</script>

<style scoped lang="css">
.event-card {
  width: 100%;
  border: 1px solid #777;
  border-radius: 5px;
}
.d-img {
  cursor: pointer;
  width: 100px;
  height: auto;
}
.truncateWidth {
  width: 300px;
}
</style>
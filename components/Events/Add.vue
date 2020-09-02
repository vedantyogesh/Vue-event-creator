<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" persistent @keyup.esc="dialog = false">
      <v-card>
        <v-card-title class="subtitle-1 grey lighten-3 mb-3" primary-title>
          <span class="grey--text font-italic mr-2">Create event</span>
          <span v-if="!!date">{{date}}</span>
        </v-card-title>

        <v-card-text>
          <v-text-field label="Name of Event" v-model="input.name" />
          <v-text-field label="Organizing Department" v-model="input.dept" />
          <v-textarea outlined label="Details" v-model="input.details" />
          <v-select item-text="title" label="Venue" :items="venues" v-model="input.venue" />

          <v-layout row wrap>
            <v-flex class="px-1">
              <datepicker
                :defaultdate="!!date ? date : ''"
                ref="datepicker1"
                @selected="val => temp.startdate = val"
                :label="'Start Date'"
              />
            </v-flex>
            <v-flex class="px-1">
              <datepicker
                ref="datepicker2"
                @selected="val => temp.enddate = val"
                :label="'End Date'"
              />
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex class="px-1">
              <timepicker
                ref="timepicker1"
                @selected="val => temp.starttime = val"
                :label="'Start Time'"
              />
            </v-flex>
            <v-flex class="px-1">
              <timepicker
                ref="timepicker2"
                @selected="val => temp.endtime = val"
                :label="'End Time'"
              />
            </v-flex>
          </v-layout>
          <v-select
            v-model="input.providers"
            :items="allproviders"
            attach
            chips
            label="Service Providers"
            multiple
            item-text="title"
          >
            <!-- <template slot="item" slot-scope="data">
              <template>
                <v-list-item-content>
                  <v-list-item-title v-html="data.item.title"></v-list-item-title>
                  <v-list-item-subtitle>{{data.item.email}}</v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>-->
          </v-select>
          <v-text-field label="Registration Link" hint="Optional" v-model="input.reglink" />
          <p class="mt-3 font-italic">Select Color for Reference:</p>
          <colorpicker style="width: 100%" v-model="input.color" />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            :disabled="$store.getters['loading/btnLoading']"
            color="red"
            text
            @click="dialog = false"
          >Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :loading="$store.getters['loading/btnLoading']"
            color="primary"
            text
            @click="add"
          >Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Swatches } from "vue-color";
import uniqid from "uniqid";
import datepicker from "@/components/Globals/Datepicker";
import timepicker from "@/components/Globals/Timepicker";

export default {
  props: ["date"],
  components: {
    datepicker,
    timepicker,
    colorpicker: Swatches
  },
  data() {
    return {
      dialog: false,
      temp: {
        startdate: "",
        enddate: "",
        starttime: "",
        endtime: ""
      },
      input: {
        name: "",
        dept: "",
        venue: "",
        details: "",
        start: "",
        end: "",
        color: "",
        reglink: "",
        providers: []
      },
      allproviders: [
        { title: "Catering", email: "vedantyogesh@gmail.com" },
        { title: "Logistics", email: "akashkpp@gmail.com" },
        { title: "Travel", email: "vedantyogesh@gmail.com" },
        { title: "Accommodation", email: "vedantyogesh@gmail.com" }
      ],
      venues: [
        { title: "TMA Pai Auditorium", email: "vedantyogesh@gmail.com" },
        { title: "Sharda Pai Auditorium", email: "vedantyogesh@gmail.com" },
        { title: "Raman Hall", email: "vedantyogesh@gmail.com" }
      ]
    };
  },
  watch: {
    dialog(bool) {
      if (!bool) setTimeout(() => this.clear(), 500);
    }
  },
  methods: {
    async add() {
      this.input.providers = this.input.providers.map(e =>
        this.allproviders.find(p => p.title === e)
      );
      this.input.venue = this.venues.find(p => p.title === this.input.venue);

      if (!this.check(this.temp)) return;

      this.input.start = `${this.temp.startdate} ${this.temp.starttime}`;
      this.input.end = `${this.temp.enddate} ${this.temp.endtime}`;
      this.input.color = this.input.color.hex;
      this.input.key = uniqid();

      if (!this.checkstats(this.input.start, this.input.end)) return;

      if (!this.check(this.input)) return;
      if (!this.check(this.input, true)) return;
      await this.$store.dispatch("events/add/addEvent", this.input);
      this.clear();
      this.dialog = false;
    },
    check(data, bool) {
      if (bool && data.providers.length === 0) {
        this.$store.dispatch(
          "alerts/setError",
          "Please select at least one provider."
        );
        return false;
      }
      for (let key in data)
        if (data[key] === "" && key !== "reglink") {
          this.$store.dispatch("alerts/setError", "All fields are required.");
          return false;
        }
      return true;
    },
    checkstats(start, end) {
      const a = new Date(start).valueOf();
      const b = new Date(end).valueOf();
      if (a > b) {
        this.$store.dispatch(
          "alerts/setError",
          "End cannot be more than Start."
        );
        return false;
      }
      return true;
    },
    clear() {
      this.temp = {
        startdate: "",
        enddate: "",
        starttime: "",
        endtime: ""
      };
      this.input = {
        name: "",
        dept: "",
        venue: "",
        details: "",
        start: "",
        end: "",
        color: "",
        reglink: "",
        providers: []
      };
      this.$refs.datepicker1.clear();
      this.$refs.datepicker2.clear();
      this.$refs.timepicker1.clear();
      this.$refs.timepicker2.clear();
    }
  }
};
</script>
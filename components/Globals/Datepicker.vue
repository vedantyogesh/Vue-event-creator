<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field v-model="date" :label="label" prepend-icon="mdi-calendar" readonly v-on="on"></v-text-field>
    </template>
    <v-date-picker :disabled="!!defaultdate" v-model="date" @input="menu = false"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: ["label", "defaultdate"],
  data: () => ({
    date: "",
    menu: false
  }),
  watch: {
    date(val) {
      this.$emit("selected", val);
    },
    defaultdate(date) {
      this.date = date;
    }
  },
  methods: {
    clear() {
      this.date = "";
    }
  }
};
</script>
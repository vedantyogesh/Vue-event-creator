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
      <v-text-field
        v-model="time"
        :label="label"
        prepend-icon="mdi-clock-outline"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker format="24hr" v-model="time" @input="menu = false"></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  props: ["label"],
  data: () => ({
    time: "",
    menu: false
  }),
  watch: {
    time(val) {
      this.$emit("selected", val);
    }
  },
  methods: {
    clear() {
      this.time = "";
    }
  }
};
</script>
<template>
  <v-dialog persistent v-model="dialog" max-width="500px" transition="dialog-transition">
    <template v-slot:activator="{ on }">
      <v-btn text :color="color" dark v-on="on">{{buttonText}}</v-btn>
    </template>
    <v-card>
      <v-card-title class="font-weight-light" primary-title>{{buttonText}}</v-card-title>
      <v-card-text>
        <v-file-input
          :disabled="$store.getters['loading/btnLoading'] "
          :accept="accept"
          v-model="uFile"
          label="File input"
        ></v-file-input>
        <v-btn
          @click="detectFiles()"
          :loading="$store.getters['loading/btnLoading']"
          :disabled="uFile == null"
          :color="color"
          outlined
        >Upload</v-btn>
        <v-progress-linear
          v-model="progressUpload"
          v-if="progressUpload != 0"
          :color="color"
          class="mt-3"
        ></v-progress-linear>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          :loading="$store.getters['loading/btnLoading']"
          @click="dialog = false"
          text
        >Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
export default {
  props: ["color", "buttonText", "accept", "id", "type"],
  data: () => ({
    dialog: false,
    progressUpload: 0,
    uFile: null,
    file: File,
    uploadTask: ""
  }),
  created() {
    console.log(this.id);
  },
  methods: {
    detectFiles() {
      if (this.uFile == null) return;
      let fileList = this.uFile;
      console.log(this.uFile);
      this.upload(fileList);
    },
    upload(file) {
      this.$store.dispatch("loading/btnLoading", true);
      this.uploadTask = firebase
        .storage()
        .ref(this.id + "/" + this.type + "s/" + file.name + "/" + file.name) //the s is added deliberately. DO NOT REMOVE
        .put(file);
    }
  },
  watch: {
    uFile: function() {
      this.progressUpload = 0;
    },
    uploadTask: function() {
      this.uploadTask.on(
        "state_changed",
        sp => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref
            .getDownloadURL()
            .then(async downloadURL => {
              await this.$store.dispatch("events/single/addFile", {
                type: this.type,
                url: downloadURL,
                id: this.id,
                name: this.uFile.name,
                date: this.$moment().format("LL")
              });
              this.$store.dispatch("loading/btnLoading", false);
              this.uFile = null;
            });
        }
      );
    }
  }
};
</script>
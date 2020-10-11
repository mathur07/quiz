<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Simple Quiz App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title>Question Count : {{ index + 1 }}/10</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import EventBus from "../event-bus";
export default {
  data: () => ({
    index: 0,
  }),
  mounted() {
    const self = this;
    EventBus.$on("update-question-count", function (index) {
      self.updateIndex(index);
    });
  },
  destroyed() {
    EventBus.$off("update-question-count");
  },
  methods: {
    updateIndex(index) {
      this.index = index;
    },
  },
};
</script>
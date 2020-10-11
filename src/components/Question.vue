<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title>{{ question ? question.question : "" }}</v-card-title>
    <v-list rounded>
      <v-list-item-group v-model="selectedOptionIndex" color="primary">
        <v-list-item
          v-for="(option, i) in options"
          :key="i"
          @change="setSelectedOption(option)"
        >
          <v-list-item-content>
            <v-list-item-title
              v-text="i + 1 + ' - ' + option"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import _lodash from "lodash";
import EventBus from "../event-bus";

export default {
  props: {
    question: Object,
  },

  data: () => ({
    selectedOption: "",
    selectedOptionIndex: undefined,
  }),

  created() {
    EventBus.$on("question-changed", this.resetSelectedOption);
  },

  destroyed() {
    EventBus.$off("question-changed");
  },
  computed: {
    options() {
      let options = {};
      if (this.question) {
        options = [
          ...(this.question.incorrect_answers || []),
          this.question.correct_answer,
        ];
        return _lodash.shuffle(options);
      } else {
        return options;
      }
    },
  },
  watch: {
    selectedOptionIndex: function (value) {
      !value ? (this.selectedOption = "") : null;
    },
  },
  methods: {
    setSelectedOption(option) {
      this.selectedOption = option;
      EventBus.$emit("selected-option", option);
    },
    resetSelectedOption() {
      this.selectedOption = "";
      this.selectedOptionIndex = undefined;
    },
  },
};
</script>

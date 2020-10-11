<template>
  <Question :question="currentQuestion">
    <template v-slot:actions>
      <v-btn
        @click="previous"
        class="ma-2"
        outlined
        color="indigo"
        :disabled="index < 1"
        >Previous</v-btn
      >
      <v-btn
        @click="next"
        class="ma-2"
        color="primary"
        :disabled="questions.length && index >= questions.length - 1"
        >Next</v-btn
      >
      <v-btn @click="reset" class="ma-2" color="warning" :disabled="index < 1"
        >Reset</v-btn
      >
      <v-spacer></v-spacer>
      <Result class="ma-2" />
    </template>
  </Question>
</template>

<script>
import Question from "./Question";
import Result from "./Result";
import EventBus from "../event-bus";

export default {
  components: {
    Question,
    Result,
  },
  props: {
    questions: Array,
  },
  data: () => ({
    answers: [],
    index: 0,
  }),
  created() {
    const self = this;
    EventBus.$on("selected-option", self.updateSelectedOption);
  },
  destroyed() {
    EventBus.$off("selected-option");
  },
  computed: {
    currentQuestion() {
      return this.questions[this.index];
    },
  },
  methods: {
    next() {
      this.index++;
      this.navigator();
    },
    previous() {
      this.index--;
      this.navigator();
    },
    reset() {
      this.index = 0;
      this.answers = [];
      this.navigator();
    },
    navigator() {
      EventBus.$emit("question-changed");
      EventBus.$emit("update-question-count", this.index);
    },
    updateSelectedOption(selectedOption) {
      const ans = {
        ...this.currentQuestion,
        selectedOption,
      };
      this.answers[this.index] = ans;

      EventBus.$emit("answers", this.answers);
    },
  },
};
</script>

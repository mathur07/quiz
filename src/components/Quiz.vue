<template>
<div>
  <Question :question="currentQuestion">
    <template v-slot:actions>
      <v-btn @click="previous" class="ma-2" outlined color="indigo" :disabled="index < 1">Previous</v-btn>
      <v-btn @click="next" color="primary" :disabled="questions.length && index >= questions.length - 1">Next</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" :disabled="!questions.length || !answers.length || questions.length !== answers.length">Submit</v-btn>
      <v-btn @click="reset" color="warning" :disabled="answers.length < 1">Reset</v-btn>
    </template>
  </Question>
</div>
</template>

<script>
import Question from "./Question"
import EventBus from '../event-bus'

export default {
  props: {
    questions: Array,
  },

  components: {
    Question,
  },

  computed: {
    currentQuestion() {
      return this.questions[this.index]
    }
  },
  data: () => ({
    index: 0,
    answers: [],
    selectedOption: null,
    correctOption: null,
  }),

  created() {
    const self = this
    EventBus.$on('answer', self.updateAnswer)
  },

  destroyed() {
    EventBus.$off('answer')
  },

  methods: {
    next() {
      this.index++
      EventBus.$emit('question-changed')
    },
    previous() {
      this.index--
      EventBus.$emit('question-changed')
    },
    reset() {
      this.index = 0
      this.answers = []
      EventBus.$emit('question-changed')
    },
    updateAnswer(answer) {
      const ans = {
        ...this.currentQuestion,
        answer
      }

      this.answers[this.index] = ans
    }
  },
};
</script>

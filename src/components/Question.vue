<template>
<v-card class="mx-auto" max-width="600">
  <v-card-title>{{ question.question }}</v-card-title>
  <v-list rounded>
    <v-list-item-group v-model="selectedOption" color="primary">
      <v-list-item v-for="(option, i) in options" :key="i" @change="selectOption(option)">
        <v-list-item-content>
          <v-list-item-title v-text="i + 1 + ' - ' + option"></v-list-item-title>
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
import _lodash from "lodash"
import EventBus from '../event-bus'

export default {
  props: {
    question: Object,
  },

  computed: {
    options() {
      let options = [...this.question.incorrect_answers, this.question.correct_answer];
      return _lodash.shuffle(options);
    }
  },

  data: () => ({
    selectedOption: null,
    answer: null,
  }),

  created() {
    const self = this
    EventBus.$on('question-changed', self.resetSelectedOption)
  },

  destroyed() {
    EventBus.$off('question-changed')
  },

  methods: {
    resetSelectedOption() {
      this.selectedOption = null
    },
    selectOption(option) {
      this.answer = option
      EventBus.$emit('answer', option)
    }
  }
};
</script>

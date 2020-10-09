<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title>{{ currentQuestion.question }}</v-card-title>
    <v-list rounded>
      <v-list-item-group v-model="selectedOption" color="primary">
        <v-list-item v-for="(option, i) in options" :key="i">
          <v-list-item-content>
            <v-list-item-title
              v-text="i + 1 + ' - ' + option"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-card-actions>
      <v-btn @click="previous" class="ma-2" outlined color="indigo"> Previous </v-btn>
      <v-btn @click="next" color="primary"> Next </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success"> Submit </v-btn>
      <v-btn @click="reset" color="warning"> Reset </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import  _lodash  from "lodash";
export default {

  props: {
    currentQuestion: Object,
    next: Function,
    previous: Function,
    reset : Function
  },
  watch: {
      currentQuestion() {
          this.selectedOption = null;
      }
  },
  computed: {
      options () {
          let options = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer];
          return _lodash.shuffle(options); 
      }
  },
  data: () => ({
    selectedOption: null,
    correctOption: null,
  }),
};
</script>
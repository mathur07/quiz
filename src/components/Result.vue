<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green"
          dark
          v-bind="attrs"
          v-on="on"
          @click="calculateTotalResponses"
        >
          Submit
        </v-btn>
      </template>
      <v-sheet class="text-center" height="300px">
        <div class="py-3">
          We have recorded {{ totalResponses }} responses. <br />You can check
          your result by clicking on "view result".
        </div>
        <v-btn @click="viewResult(answers)" class="mt-6 mx-2">
          View Result
        </v-btn>
        <v-btn
          class="mt-6 mx-2"
          color="error"
          @click="
            correctAnswerCount = 0;
            sheet = !sheet;
            viewCorrectAnswerCount = false;
          "
        >
          close
        </v-btn>
        <div v-if="viewCorrectAnswerCount" class="mt-6 mx-2">
          "{{ correctAnswerCount }} are correct out of
          {{ totalResponses }} questions you attempted"
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import EventBus from "../event-bus";
export default {
  data: () => ({
    answers: [],
    sheet: false,
    totalResponses: 0,
    correctAnswerCount: 0,
    viewCorrectAnswerCount: false,
  }),
  created() {
    EventBus.$on("answers", this.setAnswers);
  },
  methods: {
    setAnswers(answers) {
      this.answers = answers;
    },
    calculateTotalResponses() {
      let result = this.answers.filter((_) => {
        return _.selectedOption;
      });
      this.totalResponses = result.length;
    },
    viewResult(answersArray) {
      this.CorrectCount = 0;
      answersArray.forEach((element) => {
        element.selectedOption === element.correct_answer
          ? this.correctAnswerCount++
          : null;
      });
      this.viewCorrectAnswerCount = true;
    },
  },
};
</script>
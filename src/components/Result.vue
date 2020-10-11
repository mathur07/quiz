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
      <v-sheet class="text-center" height="400px">
        <div class="py-3">
          We have recorded {{ totalResponses }} responses. <br />You can check
          your result by clicking on "view result".
        </div>
        <v-btn @click="ResultsDisplayed(answers)" class="mt-6 mx-2"> View Result </v-btn>
        <v-btn class="mt-6 mx-2" color="error" @click="sheet = !sheet; ButtonOn = false">
          close
        </v-btn>
        <div v-if="ButtonOn" class="mt-6 mx-2">
          "You gave {{CorrectCount}} Correct Answers"
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
    CorrectCount: 0,
    ButtonOn: false
    
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
    ResultsDisplayed(SelectedArray) {
      this.CorrectCount = 0
      for (var value of SelectedArray) {
        if (value["selectedOption"] === value["correct_answer"])
        {
          this.CorrectCount+=1;
        }
      }
      this.ButtonOn=true
    }
  },
};
</script>
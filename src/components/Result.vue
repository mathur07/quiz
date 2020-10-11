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
        <v-btn class="mt-6 mx-2" color="error" @click="sheet = !sheet">
          close
        </v-btn>
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
    flag : 0
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
    ResultsDisplayed(val) {
      let CorrectCount = 0
      for (let i=0;i<val.length;i++)
      {
        if (val[i]["selectedOption"] === val[i]["correct_answer"])
        {
          CorrectCount+=1
        }
      }
      window.alert("You gave " + CorrectCount + " Correct Answers");
    }

  },
};
</script>

<template>
  <v-app>
    <Header :index = "index"/>
    <v-main>
      <Questions
        :currentQuestion = "questions[index]"
        :next = "next"
        :previous = "previous"
        :reset  = "reset"
        v-if="this.questions.length"
      />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import Header from "./components/Header";
import Questions from "./components/Questions";

export default {
  name: "App",

  components: {
    Header,
    Questions,
  },

  data: () => ({
    questions: [],
    index: 0,
  }),

  mounted() {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple"
      )
      .then((res) => {
        this.questions = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    next () {
      this.index++;
    },
    previous () {
      this.index--;
    },
    reset () {
      this.index = 0;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #375470;
  margin-top: 60px;
}
</style>

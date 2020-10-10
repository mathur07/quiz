<template>
<v-app>
  <Header :index="index" />
  <v-main>
    <Quiz :questions="questions" v-if="this.questions.length" />
  </v-main>
</v-app>
</template>

<script>
import axios from "axios";
import Header from "./components/Header";
import Quiz from "./components/Quiz";

export default {
  name: "App",

  components: {
    Header,
    Quiz,
  },

  data: () => ({
    questions: [],
    index: 0,
  }),

  async mounted() {
    try {
      const res = await axios.get("https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple")
      this.questions = res.data.results;
    } catch (err) {
      console.log(err);
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

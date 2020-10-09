<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Simple Quiz App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title>Question Count : {{index + 1}}/10</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
    props: {
        index : Number
    }
}
</script>
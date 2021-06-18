<template>
  <div class="container mt-5 text-center">
    <h1>Home</h1>
    <v-tabs align-with-title>
      <v-tab to="movies">
        MOVIES
      </v-tab>
      <v-tab to="characters">
        CHARACTERS
      </v-tab>
      <v-tab to="quotes">
        QUOTES
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>

export default {

  name: 'Home',


}
</script>



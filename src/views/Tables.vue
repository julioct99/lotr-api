<template>
  <div class="container mt-5 text-center">
    <h1>TABLES</h1>
    <v-tabs align-with-title>
      <v-tab to="/tables/movies">
        MOVIES
      </v-tab>
      <v-tab to="/tables/characters">
        CHARACTERS
      </v-tab>
      <v-tab to="/tables/quotes">
        QUOTES
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Tables',
}
</script>



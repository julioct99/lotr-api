<template>
  <div class="container text-center">
    <v-card v-if="!loading" class="elevation-8 mt-5">
      <v-card-title>MOVIES</v-card-title>
      <v-data-table
        :items="movies"
        :headers="movieHeaders"
        :items-per-page="5"
      ></v-data-table>
    </v-card>

    <div v-if="loading">
      <v-sheet class="pa-3 mt-5 elevation-8">
        <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
      </v-sheet>
      <v-progress-linear
        indeterminate
        color="cyan"
        class="mt-5"
      ></v-progress-linear>
    </div>
  </div>
</template>

<script>
import store from "../store/main";

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    movies() {
      return store.getMovies();
    },
    movieHeaders() {
      return store.getMovieHeaders();
    },
  },
};
</script>

<style>
</style>
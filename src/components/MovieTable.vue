<template>
  <div class="container text-center">
    <v-card v-if="!loading" class="elevation-8 mt-5">
      <v-card-title>MOVIES</v-card-title>

      <v-btn
        small
        class="text-left mx-1 my-5"
        :key="header.value"
        v-for="header in originalHeaders"
        @click="toggleHiddenColumn(header.value)"
        :color="hiddenColumns.includes(header.value) ? 'gray' : 'primary'"
      >
        <v-icon class="mr-1">
          {{ hiddenColumns.includes(header.value) ? "mdi-eye-off" : "mdi-eye" }}
        </v-icon>
        {{ header.value }}
      </v-btn>
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
      state: store.state,
      hiddenColumns: [],
    };
  },
  methods: {
    toggleHiddenColumn(column) {
      if (this.hiddenColumns.includes(column)) {
        const index = this.hiddenColumns.indexOf(column);
        this.hiddenColumns.splice(index, 1);
      } else {
        this.hiddenColumns.push(column);
      }
    },
  },
  computed: {
    loading() {
      return this.state.moviesLoading;
    },
    movies() {
      return store.getMovies();
    },
    originalHeaders() {
      return store.getMovieHeaders();
    },
    movieHeaders() {
      return this.originalHeaders.filter(
        (h) => !this.hiddenColumns.includes(h.value)
      );
    },
  },
};
</script>

<style>
</style>
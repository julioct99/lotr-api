<template>
  <div class="container text-center">
    <v-card
      v-if="!loading"
      class="elevation-8 mt-5"
    >
      <v-card-title>MOVIES</v-card-title>
      <v-data-table
        :items="movies"
        :headers="movieHeaders"
        :items-per-page="5"
      ></v-data-table>
    </v-card>

    <div v-if="loading">
      <v-sheet class="pa-3 mt-5 elevation-8">
        <v-skeleton-loader
          class="mx-auto"
          type="table"
        ></v-skeleton-loader>
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
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      movies: [],
      movieHeaders: [],
      apiURL: process.env.VUE_APP_API_URL,
      apiToken: process.env.VUE_APP_API_TOKEN
    }
  },
  created() {
    this.loadItems()
  },
  methods: {
    loadItems() {
      this.loading = true
      const url = `${this.apiURL}/movie`
      console.log(url);
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`
        }
      }).
        then(res => {
          const items = res.data
          this.movies = items.docs
          if (this.movieHeaders.length === 0) {
            this.loadMovieHeaders()
          }
          this.loading = false
        })
    },
    loadMovieHeaders() {
      const movie = this.movies[0]
      for (let key of Object.keys(movie)) {
        if (key === '_id') continue
        this.movieHeaders.push({
          text: key,
          value: key
        })
      }
    }
  }
}
</script>

<style>
</style>
<template>
  <div class="container mt-5 text-center">
    <h2 class="mb-5">Movies</h2>

    <v-data-table
      :items="movies"
      :headers="movieHeaders"
      :items-per-page="5"
      class="elevation-8"
    ></v-data-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
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
        })
    },
    loadMovieHeaders() {
      const movie = this.movies[0]
      for (let key of Object.keys(movie)) {
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
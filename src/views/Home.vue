<template>
  <div class="container mt-5 text-center">
    <h1>Testing API: Movies</h1>
    <p
      :key="movie._id"
      v-for="movie in movies"
    >
      {{
        movie
      }}
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {

  name: 'Home',
  data() {
    return {
      movies: [],
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
        })
    }
  }
}
</script>

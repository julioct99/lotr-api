<template>
  <div class="container text-center">
    <h2 class="mb-5">QuoteTable Component</h2>
    <v-data-table
      v-if="!loading"
      :items="quotes"
      :headers="quoteHeaders"
      :items-per-page="5"
      class="elevation-8"
    ></v-data-table>

    <div v-if="loading">
      <v-sheet
        :color="grey"
        class="pa-3 mt-5 elevation-8"
      >
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
      quotes: [],
      quoteHeaders: [],
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
      const url = `${this.apiURL}/quote`
      console.log(url);
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`
        }
      }).
        then(res => {
          const items = res.data
          this.quotes = items.docs
          if (this.quoteHeaders.length === 0) {
            this.loadQuoteHeaders()
          }
          this.loading = false
        })
    },
    loadQuoteHeaders() {
      const quote = this.quotes[0]
      for (let key of Object.keys(quote)) {
        if (key === '_id') continue
        this.quoteHeaders.push({
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
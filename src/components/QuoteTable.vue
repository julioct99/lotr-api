<template>
  <div class="container text-center">
    <h2 class="mb-5">QuoteTable Component</h2>
    <v-data-table
      :items="quotes"
      :headers="quoteHeaders"
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
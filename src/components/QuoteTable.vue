<template>
  <div class="container text-center">
    <v-card
      v-if="!loading"
      class="elevation-8 mt-5"
    >
      <v-card-title>QUOTES</v-card-title>
      <v-data-table
        :items="filteredQuotes"
        :headers="quoteHeaders"
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
import store from '../shared/store'

export default {
  props: {
    derived: Boolean,
    characterId: String
  },
  data() {
    return {
      loading: false,
    }
  },
  created() {
    store.init()
  },
  computed: {
    quotes() {
      return store.getQuotes()
    },
    quoteHeaders() {
      return store.getQuoteHeaders()
    },
    filteredQuotes() {
      let quotes = [...this.quotes]
      if (this.derived && this.characterId) {
        quotes = quotes.filter(q => q.character === this.characterId)
      }
      return quotes
    }
  }
}
</script>

<style>
</style>
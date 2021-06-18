<template>
  <div class="container text-center">
    <v-card
      v-if="!loading"
      class="elevation-8 mt-5"
    >
      <v-card-title>CHARACTERS</v-card-title>
      <v-data-table
        :items="characters"
        :headers="characterHeaders"
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
import axios from 'axios'

export default {
  data() {
    return {
      loading: false,
      characters: [],
      characterHeaders: [],
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
      const url = `${this.apiURL}/character`
      axios.get(url, { headers: { Authorization: `Bearer ${this.apiToken}` } })
        .then(res => {
          const items = res.data
          this.characters = items.docs
          if (this.characterHeaders.length === 0) {
            this.loadCharacterHeaders()
          }
          this.loading = false
        })
    },
    loadCharacterHeaders() {
      const character = this.characters[0]
      for (let key of Object.keys(character)) {
        if (key === "_id") continue
        this.characterHeaders.push({
          text: key,
          value: key,
          align: 'start',
        })
      }
    }
  }
}
</script>

<style>
</style>
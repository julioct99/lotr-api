<template>
  <div class="container text-center mb-5">

    <div class="row mt-5">
      <v-radio-group
        class="col-sm-2"
        v-model="genderFilter"
      >
        <v-radio
          v-for="gender in genders"
          :key="gender"
          :label="gender"
          :value="gender"
        ></v-radio>
        <v-btn
          @click="genderFilterOn = !genderFilterOn"
          class="w-25"
          :color="genderFilterOn ? 'primary' : 'gray'"
        > {{ genderFilterOn ? 'On' : 'Off' }} </v-btn>
      </v-radio-group>
      <div class="col-sm-4">
        <div class="row">
          <div class="col-sm-6">
            <v-checkbox
              class="shrink mr-0 mt-0"
              v-model="raceFilters"
              label="Human"
              value="Human"
            ></v-checkbox>
            <v-checkbox
              class="shrink mr-0 mt-0"
              v-model="raceFilters"
              label="Elf"
              value="Elf"
            ></v-checkbox>
            <v-checkbox
              class="shrink mr-0 mt-0"
              v-model="raceFilters"
              label="Dwarf"
              value="Dwarf"
            ></v-checkbox>
          </div>
          <div class="col-sm-6">
            <v-checkbox
              class="shrink mr-0 mt-0"
              v-model="raceFilters"
              label="Hobbit"
              value="Hobbit"
            ></v-checkbox>
            <v-checkbox
              class="shrink mr-0 mt-0"
              v-model="raceFilters"
              label="Orc"
              value="Orc"
            ></v-checkbox>
            <v-checkbox
              class="shrink mr-0 mt-0"
              v-model="raceFilters"
              label="Dragon"
              value="Dragon"
            ></v-checkbox>
          </div>
        </div>
      </div>
    </div>

    <v-card
      v-if="!loading"
      class="elevation-8 mt-5"
    >
      <v-card-title>CHARACTERS</v-card-title>
      <v-data-table
        :items="filteredCharacters"
        :headers="characterHeaders"
        :items-per-page="5"
        item-key="_id"
        :single-select="true"
        show-select
        v-model="selectedRow"
        @click:row="handleRowClick"
      ></v-data-table>
    </v-card>

    <div v-if="selectedRow.length > 0">
      <quote-table />
    </div>

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
import QuoteTable from './QuoteTable.vue'

export default {
  components: {
    QuoteTable
  },
  data() {
    return {
      loading: false,
      characters: [],
      genders: ["Male", "Female"],
      genderFilter: "Female",
      genderFilterOn: false,
      characterHeaders: [],
      raceFilters: [],
      selectedRow: [],
      apiURL: process.env.VUE_APP_API_URL,
      apiToken: process.env.VUE_APP_API_TOKEN
    }
  },
  created() {
    this.loadItems()
  },
  methods: {
    handleRowClick(row) {
      console.log(row);
    },
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
  },
  computed: {
    filteredCharacters() {
      let characters = [...this.characters]
      if (this.genderFilterOn) {
        characters = characters.filter(c => c.gender === this.genderFilter)
      }
      if (this.raceFilters.length > 0) {
        characters = characters.filter(c => this.raceFilters.includes(c.race))
      }
      return characters
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<template>
  <div class="container text-center">

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

    <v-data-table
      :items="filteredCharacters"
      :headers="characterHeaders"
      :items-per-page="5"
      item-key="_id"
      class="elevation-8"
      :single-select="true"
      show-select
      v-model="selectedRow"
      @click:row="handleRowClick"
    ></v-data-table>

    <div v-if="selectedRow.length > 0">
      <QuoteTable />
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
      const url = `${this.apiURL}/character`
      axios.get(url, { headers: { Authorization: `Bearer ${this.apiToken}` } })
        .then(res => {
          const items = res.data
          this.characters = items.docs
          if (this.characterHeaders.length === 0) {
            this.loadCharacterHeaders()
          }
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
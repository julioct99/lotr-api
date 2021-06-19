<template>
  <div class="container text-center">
    <h2 class="mb-5">CharacterTable Component</h2>

    <v-container
      class="px-0 row"
      fluid
    >
      <v-radio-group
        class="col-sm-3"
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
    </v-container>
    <v-data-table
      :items="filteredCharacters"
      :headers="characterHeaders"
      :items-per-page="5"
      class="elevation-8"
    ></v-data-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      characters: [],
      genders: ["Male", "Female"],
      genderFilter: "Female",
      genderFilterOn: false,
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
      return characters
    }
  }
}
</script>

<style>
</style>
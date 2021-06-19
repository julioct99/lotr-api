<template>
  <div class="container text-center mb-5">
    <div class="row mt-5">
      <v-radio-group class="col-sm-2" v-model="genderFilter">
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
        >
          {{ genderFilterOn ? "On" : "Off" }}
        </v-btn>
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

    <v-card v-if="!loading" class="elevation-8 mt-5">
      <v-card-title
        >CHARACTERS
        <v-spacer></v-spacer>
        <v-text-field
          v-model="nameSearch"
          append-icon="mdi-magnify"
          label="Search character name"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

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
      <quote-table derived :characterId="selectedCharacter._id" />
    </div>

    <div v-if="loading">
      <v-sheet class="pa-3 mt-5 elevation-8">
        <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
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
import QuoteTable from "./QuoteTable.vue";
import store from "../shared/store";

export default {
  components: {
    QuoteTable,
  },
  data() {
    return {
      loading: false,
      nameSearch: "",
      genders: ["Male", "Female"],
      genderFilter: "Female",
      genderFilterOn: false,
      raceFilters: [],
      selectedRow: [],
    };
  },
  methods: {
    handleRowClick(row) {
      console.log(row);
    },
  },
  computed: {
    selectedCharacter() {
      if (this.selectedRow.length === 0) return;
      const id = this.selectedRow[0]._id;
      console.log(id);
      return store.getCharacter(id);
    },
    characters() {
      return store.getCharacters();
    },
    characterHeaders() {
      return store.getCharacterHeaders();
    },
    filteredCharacters() {
      let characters = [...this.characters];
      if (this.genderFilterOn) {
        characters = characters.filter((c) => c.gender === this.genderFilter);
      }
      if (this.raceFilters.length > 0) {
        characters = characters.filter((c) =>
          this.raceFilters.includes(c.race)
        );
      }
      if (this.nameSearch.length > 0) {
        characters = characters.filter((c) =>
          c.name.toLowerCase().startsWith(this.nameSearch.toLowerCase())
        );
      }
      return characters;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
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

      <v-btn
        class="text-left mx-1 my-5"
        :key="header.value"
        v-for="header in originalHeaders"
        @click="toggleHiddenColumn(header.value)"
        :color="hiddenColumns.includes(header.value) ? 'gray' : 'primary'"
      >
        <v-icon class="mr-1">
          {{ hiddenColumns.includes(header.value) ? "mdi-eye-off" : "mdi-eye" }}
        </v-icon>
        {{ header.value }}
      </v-btn>
      <v-data-table
        :items="filteredCharacters"
        :headers="characterHeaders"
        :items-per-page="5"
        item-key="_id"
        :single-select="true"
        show-select
        v-model="selectedRow"
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
import store from "../store/main";

export default {
  components: {
    QuoteTable,
  },
  data() {
    return {
      state: store.state,
      genders: ["Male", "Female"],
      nameSearch: localStorage.getItem("characterNameSearch") || "",
      genderFilter: localStorage.getItem("genderFilter") || "Female",
      genderFilterOn: localStorage.getItem("genderFilterOn") || false,
      raceFilters: JSON.parse(localStorage.getItem("raceFilters")) || [],
      selectedRow:
        JSON.parse(localStorage.getItem("selectedCharacterRow")) || [],
      hiddenColumns:
        JSON.parse(localStorage.getItem("hiddenCharacterColumns")) || [],
    };
  },
  methods: {
    toggleHiddenColumn(column) {
      if (this.hiddenColumns.includes(column)) {
        const index = this.hiddenColumns.indexOf(column);
        this.hiddenColumns.splice(index, 1);
      } else {
        this.hiddenColumns.push(column);
      }
    },
  },
  computed: {
    loading() {
      return this.state.charactersLoading;
    },
    selectedCharacter() {
      if (this.selectedRow.length === 0) return;
      const id = this.selectedRow[0]._id;
      console.log(id);
      return store.getCharacter(id);
    },
    characters() {
      return store.getCharacters();
    },
    originalHeaders() {
      return store.getCharacterHeaders();
    },
    characterHeaders() {
      return this.originalHeaders.filter(
        (h) => !this.hiddenColumns.includes(h.value)
      );
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
  watch: {
    nameSearch: function () {
      localStorage.setItem("characterNameSearch", this.nameSearch);
    },
    genderFilter: function () {
      localStorage.setItem("genderFilter", this.genderFilter);
    },
    genderFilterOn: function () {
      localStorage.setItem("genderFilterOn", this.genderFilterOn);
    },
    raceFilters: function () {
      localStorage.setItem("raceFilters", JSON.stringify(this.raceFilters));
    },
    selectedRow: function () {
      localStorage.setItem(
        "selectedCharacterRow",
        JSON.stringify(this.selectedRow)
      );
    },
    hiddenColumns: function () {
      localStorage.setItem(
        "hiddenCharacterColumns",
        JSON.stringify(this.hiddenColumns)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
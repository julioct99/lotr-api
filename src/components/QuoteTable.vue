<template>
  <div class="container text-center">
    <v-radio-group row v-model="movieFilter">
      <v-radio
        v-for="movie in movies"
        :key="movie"
        :label="movie"
        :value="movie"
      ></v-radio>
    </v-radio-group>
    <v-btn
      @click="movieFilterOn = !movieFilterOn"
      class="d-block"
      :color="movieFilterOn ? 'primary' : 'gray'"
    >
      Filter by movie: {{ movieFilterOn ? "On" : "Off" }}
    </v-btn>

    <v-card v-if="!loading" class="elevation-8 mt-5">
      <v-card-title
        >QUOTES
        <v-spacer></v-spacer>
        <v-text-field
          v-model="dialogSearch"
          append-icon="mdi-magnify"
          label="Search dialog"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-btn
        class="text-left mx-5 my-5"
        :key="header.value"
        v-for="header in originalHeaders"
        @click="toggleHiddenColumn(header.value)"
        :color="hiddenColumns.includes(header.value) ? 'gray' : 'primary'"
      >
        <v-icon class="mr-3">
          {{ hiddenColumns.includes(header.value) ? "mdi-eye-off" : "mdi-eye" }}
        </v-icon>
        {{ header.value }}
      </v-btn>
      <v-data-table
        :items="filteredQuotes"
        :headers="quoteHeaders"
        :items-per-page="5"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">
                  {{ editMode ? "EDIT QUOTE" : "DUPLICATE (INSERT) QUOTE" }}
                </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="editedQuote.dialog"
                    label="Quote"
                  ></v-text-field>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveQuote">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editQuote(item)">
            mdi-pencil
          </v-icon>
          <v-icon class="mr-2" small @click="deleteQuote(item)">
            mdi-delete
          </v-icon>
          <v-icon small @click="duplicateQuote(item)">
            mdi-content-duplicate
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

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
import store from "../store/main";

export default {
  props: {
    derived: Boolean,
    characterId: String,
  },
  data() {
    return {
      state: store.state,
      dialog: false,
      editedQuote: { dialog: "" },
      editedQuoteRef: null,
      editMode: false,
      dialogSearch: localStorage.getItem("dialogSearch") || "",
      movieFilterOn: localStorage.getItem("movieFilterOn") || false,
      movieFilter: JSON.parse(localStorage.getItem("movieFilter")) || [],
      hiddenColumns:
        JSON.parse(localStorage.getItem("hiddenQuoteColumns")) || [],
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
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedQuote = {};
      });
      this.editMode = false;
    },
    saveQuote() {
      this.dialog = false;
      if (this.editMode) {
        this.editedQuoteRef.dialog = this.editedQuote.dialog;
        store.updateQuote(this.editedQuote);
        this.editMode = false;
      } else {
        store.insertQuote(this.editedQuote);
      }
      this.editedQuote = {};
      this.editedQuoteRef = null;
    },
    editQuote(quote) {
      this.editMode = true;
      this.dialog = true;
      this.editedQuoteRef = quote;
      this.editedQuote = Object.assign({}, quote);
    },
    deleteQuote(quote) {
      store.deleteQuote(quote._id);
    },
    duplicateQuote(quote) {
      this.editMode = false;
      this.dialog = true;
      this.editedQuote = Object.assign({}, quote);
    },
  },
  computed: {
    loading() {
      return this.state.quotesLoading;
    },
    quotes() {
      let _quotes = store.getQuotes();
      _quotes = _quotes.map((q) => ({
        ...q,
        ["characterId"]: q.character,
        ["movieId"]: q.movie,
        ["movie"]: store.getMovie(q.movie)?.name,
        ["character"]: store.getCharacter(q.character)?.name,
      }));
      return _quotes;
    },
    movies() {
      return store.getMovies().map((m) => m.name);
    },
    originalHeaders() {
      let _headers = store.getQuoteHeaders();
      _headers.push({
        text: "actions",
        value: "actions",
        width: "100px",
      });
      return _headers;
    },
    quoteHeaders() {
      let _headers = this.originalHeaders;
      _headers = _headers.filter((h) => !this.hiddenColumns.includes(h.value));
      return _headers;
    },
    filteredQuotes() {
      let quotes = [...this.quotes];
      if (this.derived && this.characterId) {
        quotes = quotes.filter((q) => q.characterId === this.characterId);
      }
      if (this.dialogSearch.length > 0) {
        quotes = quotes.filter((q) =>
          q.dialog.toLowerCase().includes(this.dialogSearch.toLowerCase())
        );
      }
      if (this.movieFilterOn) {
        quotes = quotes.filter((q) => q.movie === this.movieFilter);
      }

      return quotes;
    },
  },
  watch: {
    dialogSearch: function () {
      localStorage.setItem("dialogSearch", this.dialogSearch);
    },
    movieFilterOn: function () {
      localStorage.setItem("movieFilterOn", this.movieFilterOn);
    },
    movieFilter: function () {
      localStorage.setItem("movieFilter", JSON.stringify(this.movieFilter));
    },
    hiddenColumns: function () {
      localStorage.setItem(
        "hiddenQuoteColumns",
        JSON.stringify(this.hiddenColumns)
      );
    },
  },
};
</script>

<style>
</style>
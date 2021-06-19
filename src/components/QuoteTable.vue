<template>
  <div class="container text-center">
    <v-card v-if="!loading" class="elevation-8 mt-5">
      <v-card-title>QUOTES</v-card-title>
      <v-data-table
        :items="filteredQuotes"
        :headers="quoteHeaders"
        :items-per-page="5"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">EDIT QUOTE</span>
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
import requestStore from "../store/requests";

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
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedQuote = {};
      });
    },
    saveQuote() {
      this.dialog = false;
      this.editedQuoteRef.dialog = this.editedQuote.dialog;
      let request = null;
      if (this.editMode) {
        request = `PUT http://backend.com/quotes/${this.editedQuote._id}`;
        store.updateQuote(this.editedQuote);
        this.editMode = false;
      } else {
        request = `POST http://backend.com/quotes/${this.editedQuote._id}`;
      }
      alert(request);
      requestStore.insertRequest(request);
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
      const request = `DELETE http://backend.com/quotes/${quote._id}`;
      alert(request);
      requestStore.insertRequest(request);
    },
    duplicateQuote(quote) {
      this.dialog = true;
      this.editedQuoteRef = quote;
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
        ["movie"]: store.getMovie(q.movie).name,
        ["character"]: store.getCharacter(q.character).name,
      }));
      return _quotes;
    },
    quoteHeaders() {
      let _headers = store.getQuoteHeaders();
      _headers.push({
        text: "actions",
        value: "actions",
      });
      return _headers;
    },
    filteredQuotes() {
      let quotes = [...this.quotes];
      if (this.derived && this.characterId) {
        quotes = quotes.filter((q) => q.characterId === this.characterId);
      }
      return quotes;
    },
  },
};
</script>

<style>
</style>
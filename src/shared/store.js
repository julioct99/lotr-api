import axios from 'axios';

const apiURL = process.env.VUE_APP_API_URL;
const apiToken = process.env.VUE_APP_API_TOKEN;
const axiosParams = { headers: { Authorization: `Bearer ${apiToken}` } };

function _loadHeaders(items, headers) {
  const item = items[0];
  for (let key of Object.keys(item)) {
    if (key === '_id') continue;
    headers.push({
      text: key,
      value: key,
    });
  }
}

const store = {
  state: {
    movies: [],
    movieHeaders: [],
    characters: [],
    characterHeaders: [],
    quotes: [],
    quoteHeaders: [],
  },
  fetchMovies() {
    const url = `${apiURL}/movie`;
    axios.get(url, axiosParams).then((res) => {
      console.log('Fetching movies ...');
      this.state.movies = res.data.docs;
      if (this.state.movieHeaders.length === 0)
        _loadHeaders(this.state.movies, this.state.movieHeaders);
    });
  },
  fetchCharacters() {
    const url = `${apiURL}/character`;
    axios.get(url, axiosParams).then((res) => {
      console.log('Fetching characters ...');
      this.state.characters = res.data.docs;
      if (this.state.characterHeaders.length === 0)
        _loadHeaders(this.state.characters, this.state.characterHeaders);
    });
  },
  fetchQuotes() {
    const url = `${apiURL}/quote`;
    axios.get(url, axiosParams).then((res) => {
      console.log('Fetching quotes ...');
      this.state.quotes = res.data.docs;
      if (this.state.quoteHeaders.length === 0)
        _loadHeaders(this.state.quotes, this.state.quoteHeaders);
    });
  },
  getMovies() {
    return [...this.state.movies];
  },
  getMovieHeaders() {
    return [...this.state.movieHeaders];
  },
  getCharacters() {
    return [...this.state.characters];
  },
  getCharacterHeaders() {
    return [...this.state.characterHeaders];
  },
  getQuotes() {
    return [...this.state.quotes];
  },
  getQuoteHeaders() {
    return [...this.state.quoteHeaders];
  },
  init() {
    if (this.state.movies.length === 0) this.fetchMovies();
    if (this.state.characters.length === 0) this.fetchCharacters();
    if (this.state.quotes.length === 0) this.fetchQuotes();
  },
  // AUX METHODS
  getMovie(id) {
    let movies = this.getMovies();
    return movies.filter((m) => m._id === id)[0];
  },
  getQuote(id) {
    let quotes = this.getQuotes();
    return quotes.filter((q) => q._id === id)[0];
  },
  updateQuote(quote) {
    const oldQuote = this.getQuote(quote._id);
    const index = this.state.quotes.indexOf(oldQuote);
    const updatedQuote = { ...oldQuote, ['dialog']: quote.dialog };
    const updatedQuotes = [...this.state.quotes];
    updatedQuotes[index] = updatedQuote;
    this.state.quotes = updatedQuotes;
  },
  getCharacter(id) {
    let characters = this.getCharacters();
    return characters.filter((c) => c._id === id)[0];
  },
};

export default store;

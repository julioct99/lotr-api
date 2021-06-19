const requestStore = {
  state: {
    requests: [],
  },
  getRequests() {
    return [...this.requests];
  },
  insertRequest(request) {
    const _request = { request, date: new Date() };
    const newRequestList = [...this.state.requests, _request];
    this.state.requests = newRequestList;
    console.log(this.state.requests);
  },
};

export default requestStore;

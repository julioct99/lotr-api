import { generateId } from '../shared/utils';

const requestStore = {
  state: {
    requests: [],
  },
  getRequests() {
    return [...this.requests];
  },
  insertRequest(request) {
    const _request = { request, date: new Date(), id: generateId() };
    const newRequestList = [...this.state.requests, _request];
    this.state.requests = newRequestList;
  },
};

export default requestStore;

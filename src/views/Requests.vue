<template>
  <div class="container my-5">
    <h1 class="mb-5 text-center">REQUESTS</h1>
    <v-btn
      color="primary"
      class="mb-5"
      @click="sortDescending = !sortDescending"
    >
      Sort by date
      <v-icon class="ms-2">
        {{ sortDescending ? "mdi-arrow-down" : "mdi-arrow-up" }}
      </v-icon>
    </v-btn>
    <v-card class="mx-auto" tile>
      <v-list-item :key="request.id" v-for="request in sortedRequests">
        <v-list-item-content>
          <v-list-item-title>
            <div class="row">
              <div class="col-sm-8">
                <v-icon class="mr-5"> {{ getIcon(request) }} </v-icon>
                {{ request.request }}
              </div>
              <div class="col-sm-4">
                {{ request.date.toLocaleString() }}
              </div>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import requestStore from "../store/requests";

export default {
  data() {
    return {
      state: requestStore.state,
      sortDescending: true,
    };
  },
  methods: {
    getIcon(request) {
      switch (request.request.split(" ")[0]) {
        case "DELETE":
          return "mdi-delete";
        case "PUT":
          return "mdi-pencil";
        case "POST":
          return "mdi-plus";
      }
    },
  },
  computed: {
    sortedRequests() {
      let _list = [...this.state.requests];
      return _list.sort((a, b) =>
        this.sortDescending
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      );
    },
  },
};
</script>

<style>
</style>
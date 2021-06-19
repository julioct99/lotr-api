<template>
  <div class="container text-center">
    <h1>REQUESTS</h1>
    <v-card class="mx-auto" tile>
      <v-list-item :key="request.id" v-for="request in state.requests">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon class="mr-5"> {{ getIcon(request) }} </v-icon>
            {{ request.request }} -
            {{ request.date.toLocaleString() }}
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
};
</script>

<style>
</style>
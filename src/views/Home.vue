<template>
  <div class="container mt-5 text-center">
    <v-icon class="my-5" x-large>mdi-ring</v-icon>
    <h1 class="my-5">Lord of the rings API</h1>
    <v-btn to="/tables" x-large color="primary" class="mx-4 my-5">
      <v-icon class="mr-5"> mdi-table-large </v-icon>
      Tables
    </v-btn>
    <v-btn to="/requests" x-large color="accent" class="mx-4 my-5">
      <v-icon class="mr-5"> mdi-server </v-icon>
      Requests
    </v-btn>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
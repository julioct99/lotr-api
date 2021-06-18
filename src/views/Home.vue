<template>
  <div class="container mt-5 text-center">
    <h1>Home</h1>
    <v-tabs align-with-title>
      <v-tab>
        <router-link
          tag="button"
          to="/movies"
        >MOVIES</router-link>
      </v-tab>
      <v-tab>
        <router-link
          tag="button"
          to="/movies"
        >CHARACTERS</router-link>
      </v-tab>
      <v-tab>
        <router-link
          tag="button"
          to="/movies"
        >QUOTES</router-link>
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>

export default {

  name: 'Home',


}
</script>



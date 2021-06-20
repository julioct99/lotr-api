<template>
  <div class="container mt-5 text-center">
    <h1>TABLES</h1>
    <v-tabs align-with-title>
      <v-tab to="/tables/movies"> MOVIES </v-tab>
      <v-tab to="/tables/characters"> CHARACTERS </v-tab>
      <v-tab to="/tables/quotes"> QUOTES </v-tab>
    </v-tabs>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Tables",
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>



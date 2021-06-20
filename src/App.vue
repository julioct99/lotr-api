<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-icon class="ms-5">mdi-ring</v-icon>

      <v-tabs right class="mr-5">
        <v-tab to="/"> HOME </v-tab>
        <v-tab to="/tables"> TABLES </v-tab>
        <v-tab to="/requests"> REQUESTS </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss" scoped>
v-icon {
  vertical-align: middle;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-icon class="ms-5">mdi-ring</v-icon>

      <v-tabs right class="mr-5">
        <v-tab to="/"> HOME </v-tab>
        <v-tab to="/tables"> TABLES </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
v-icon {
  vertical-align: middle;
}
</style>
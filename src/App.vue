<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-toolbar-title>
        <v-icon>mdi-ring</v-icon>
        LOTR API
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-button></v-button> -->
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

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
<template>
  <v-app :dark="darkMode">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light cursor-p" @click="goToHomePage">Where in the World?</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat block large @click="toggleDarkMode">
          <v-icon left>opacity</v-icon>Dark Mode
        </v-btn>
        <v-btn flat block large @click="dialog = !dialog">
          <v-icon left>info</v-icon>About
        </v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up" bottom left>
        <v-toolbar-side-icon slot="activator" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" :mini-variant="mini" :dark="darkMode" temporary fixed class="navigation-drawer-z">
      <v-list class="pa-2">
        <v-btn flat block large @click="toggleDarkMode">
          <v-icon left>opacity</v-icon>Dark Mode
        </v-btn>
        <v-btn flat block large @click="toggleAboutModal">
          <v-icon left>info</v-icon>About
        </v-btn>
        <v-divider dark></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline lighten-2" primary-title>About This!</v-card-title>
          <v-card-text>
            A rest countries API product done using Vue.
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-dialog>

      <main>
        <router-view/>
      </main>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: "App",
  data: () => ({
    drawer: null,
    mini: false,
    darkMode: false,
    dialog: false
  }),

  methods: {
    toggleDarkMode() {
      this.drawer   = !this.drawer; 
      this.darkMode = !this.darkMode;
    },
    goToHomePage() {
      this.$router.push("/");
    },
    toggleAboutModal(){
      this.drawer = !this.drawer;
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 960px) {
  button {
    ::v-deep .v-btn__content {
      justify-content: left !important;
    }
  }
}

.cursor-p {
  cursor: pointer;
}

.navigation-drawer-z{
  z-index: 1005 !important;
}
</style>


<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
          <Flagcards v-for="country of data" :key="country.code" :countryData = "country" @click.native="testFunction(country)" />
    </v-layout>
  </v-container>
</template>
<script>

export default {
  name: "Flaglayouts",
  props: ["data"],
  components:{
     Flagcards: () => import("./FlagCard")
  },
  methods:{
    testFunction(country){
      this.$router.push({name: 'Country' , params:{countryName:country.name}});
    }
  }
};
</script>
<style lang="scss" scoped>
</style>


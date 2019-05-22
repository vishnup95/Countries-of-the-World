<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
          <Flagcards v-for="country of data" :key="country.code" :countryData = "country" @click.native="testFunction(country)" />
    </v-layout>
  </v-container>
</template>
<script>
import Flagcards from './FlagCard'

export default {
  name: "Flaglayouts",
  props: ["data"],
  components:{
    Flagcards,
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


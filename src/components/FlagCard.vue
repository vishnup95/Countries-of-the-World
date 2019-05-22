<template>
<v-flex xs12 sm6 md4>
  <v-card height= 500 hover>
    <v-img :src="countryData.flag" :lazy-src="`https://picsum.photos/10/6?image=1`" :alt="countryData.name" height="300px"></v-img>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{countryData.name}}</h3>
        <div>
          <span>Capital :</span>
          {{countryData.capital}}
        </div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange">Share</v-btn>
      <v-btn flat color="orange">Explore</v-btn>
    </v-card-actions>
  </v-card>
</v-flex>
</template>
<script>
export default {
  name: "Flagcards",
  props: ["countryData"]
};
</script>
<style lang="scss" scoped>
</style>


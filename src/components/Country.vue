<template>
  <v-container grid-list-lg>
    <div class="text-xs-center" v-if="isLoading">
      <v-progress-circular indeterminate color="primary" :size="70" :width="7"></v-progress-circular>
    </div>
    <div v-else>
      <v-layout row wrap justify-center>
        <v-flex wrap class="d-flex-wrap">
          <v-flex xs12 md6>
            <v-img :src="countryData.flag"></v-img>
          </v-flex>
          <v-flex xs12 md6 class="text-xs-right">
            <span class="display-3"> {{countryData.name}}</span>
            <br>
            <span class="display-1">Capital : {{countryData.capital}}</span>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12 md6>
          <v-flex class="text-xs-left">
            <p class="headline mb-0">Other Names</p>
            <v-divider></v-divider>
            <template v-for="names in countryData.altSpellings">
              <span v-if="names.length>2" :key="names" class="subheading font-weight-thin">
                {{names}}
                <br>
              </span>
            </template>
            <br>
            <span class="subheading font-weight-medium">Native Name:</span>
            <span class="subheading font-weight-thin"> {{countryData.nativeName}}</span>
          </v-flex>
        </v-flex>
        <v-flex xs12 md6>
          <v-flex>
            <p class="headline mb-0">Geographical Information</p>
            <v-divider></v-divider>
            <br>
            <span class="subheading font-weight-medium">Capital:</span>
            <span class="subheading font-weight-thin"> {{countryData.capital}}</span>
            <br>
            <span class="subheading font-weight-medium">Region / Continent:</span>
            <span class="subheading font-weight-thin"> {{countryData.region}}</span>
            <br>
            <span class="subheading font-weight-medium">Sub-Region:</span>
            <span class="subheading font-weight-thin"> {{countryData.subregion}}</span>
            <br>
            <span class="subheading font-weight-medium">People are called:</span>
            <span class="subheading font-weight-thin"> {{countryData.demonym}}</span>
            <br>
            <span class="subheading font-weight-medium">Area:</span>
            <span class="subheading font-weight-thin">
               {{countryData.area}} km
              <sup>2</sup>
            </span>
            <br>
            <span class="subheading font-weight-medium">Population:</span>
            <span class="subheading font-weight-thin"> {{countryData.population}}</span>
            <br>
            <span class="subheading font-weight-medium">Lat/Lang:</span>
            <span class="subheading font-weight-thin"> {{countryData.latlng}}</span>
            <br>
            <span class="subheading font-weight-medium">Land Borders: </span>
            <template v-for="(neighbour,index) in countryData.borders">
              <span
                class="subheading font-weight-medium blue--text cursor-p"
                :key="neighbour"
                @click="goToNeighBour(neighbour)"
              >{{neighbour}}</span>
              <span :key="neighbour + index" v-if="index !== countryData.borders.length -1">, </span>
            </template>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12 md6>
          <v-flex class="text-xs-left">
            <p class="headline mb-0">Languages And Currencies</p>
            <v-divider></v-divider>
            <template v-for="language in countryData.languages">
              <span :key="language.name" class="subheading font-weight-thin">
                {{language.name}} - {{language.nativeName}}
                <br>
              </span>
            </template>
            <br>
            <p class="headline mb-0">Money Notations</p>
            <v-divider></v-divider>
            <template v-for="currency in countryData.currencies">
              <span :key="currency.code" class="subheading font-weight-thin">
                {{currency.name}} - {{currency.code}}
                <br>
              </span>
            </template>
            <br>
          </v-flex>
        </v-flex>
        <v-flex xs12 md6>
          <v-flex>
            <p class="headline mb-0">Map Should Go Here!!</p>
            <v-divider></v-divider>
            <br>
            <template>
              <l-map :zoom="zoom" :center="center" style="height: 400px;">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-geo-json :geojson="geojson"></l-geo-json>
              </l-map>
            </template>
          </v-flex>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";
import { latLng } from "leaflet";
import { LMap, LTileLayer, LGeoJson} from "vue2-leaflet";

export default {
  name: "Country",
  props: ["countryName"],
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },

  data: () => ({
    countryData: [],
    isLoading: false,
    countryCode: null,
    zoom: 3,
    center: null,
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    geojson:null
  }),

  created() {
    this.fetchData();
  },

  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  },

  methods: {
    fetchData() {
      this.isLoading = true;
      if (this.countryName.length > 3) {
        axios
          .get(
            `https://restcountries.eu/rest/v2/name/${this.countryName}?fullText=true`
          )
          .then(response => {
            this.isLoading = false;
            this.countryData = response.data[0];
            this.countryCode =  this.countryData.alpha3Code.toLowerCase();
            axios.get(`https://raw.githubusercontent.com/mledoze/countries/master/data/${this.countryCode}.geo.json`)
            .then(data => {
              this.geojson = data.data
            });
            this.center = latLng(this.countryData.latlng[0],this.countryData.latlng[1]);
          });          
      } else {
        axios
          .get(`https://restcountries.eu/rest/v2/alpha/${this.countryName}`)
          .then(response => {
            this.isLoading = false;
            this.countryData = response.data;
            this.countryCode =  this.countryData.alpha3Code.toLowerCase();
            axios.get(`https://raw.githubusercontent.com/mledoze/countries/master/data/${this.countryCode}.geo.json`)
            .then(data => {
              this.geojson = data.data
            });
            this.center = latLng(this.countryData.latlng[0],this.countryData.latlng[1]);
           
          });
      }
    },

    goToNeighBour(neighbour) {
        this.$router.push({
        name: "Country",
        params: { countryName: neighbour }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.d-flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.text--underline {
  text-decoration: underline;
}

.cursor-p{
  cursor: pointer;
}
</style>


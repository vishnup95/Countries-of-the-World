<template>
  <div>
    <v-container>
      <v-layout align-center justify-space-between row wrap fill-height>
        <v-flex xs12 sm4 md4>
          <v-text-field
            solo
            label="Search"
            append-icon="search"
            clearable
            @input="searchCountries"
            @keyup="keyBoardCheck"
            v-model="searchValue"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-select
            v-model="selected"
            :items="filterList"
            label="Filter By"
            @input="filterOptionChanged"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout>
        <v-flex>
          <div class="text-xs-center">
            <v-pagination v-model="page" :length="paginationLength" @input="paginationEvent"></v-pagination>
          </div>
          <div class="text-xs-right mt-4">
            <v-btn small color="primary" v-if="showShowAll" @click="showAll">SHOW ALL</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="text-xs-center" v-if="isLoading">
      <v-progress-circular indeterminate color="primary" :size="70" :width="7"></v-progress-circular>
    </div>
    <Flaglayouts :data="flagData"/>
    <div class="text-xs-right pos-fixed" v-if="showScrollTop" @click="scrollTop">
      <v-icon class="scroll-top-icon">arrow_upward</v-icon>
    </div>
    <v-container>
      <v-layout>
        <v-flex>
          <div class="text-xs-center">
            <v-pagination v-model="page" :length="paginationLength" @input="paginationEvent"></v-pagination>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Flaglayouts from "./FlagComponent";

export default {
  components: {
    Flaglayouts
  },

  data: () => ({
    countryData: [],
    displayData: [],
    filterList: ["Asia", "Africa", "Americas", "Europe", "Oceania"],
    page: 1,
    sliceStartPoint: 0,
    sliceEndPoint: 12,
    isLoading: true,
    showScrollTop: false,
    showShowAll: false,
    selected: null,
    searchValue: null
  }),

  computed: {
    flagData() {
      return this.displayData.slice(this.sliceStartPoint, this.sliceEndPoint);
    },

    paginationLength() {
      return Math.floor(this.displayData.length / 12);
    }
  },

  mounted() {
    this.isLoading = true;
    axios
      .get(process.env.VUE_APP_API_ENDPOINT + "all")
      .then(response => {
        this.isLoading = false;
        this.countryData = response.data;
        this.displayData = this.countryData;
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
      });
  },

  methods: {
    paginationEvent(page) {
      this.sliceStartPoint = 13 * page - 13;
      this.sliceEndPoint = 13 * page - 1;
      this.scrollTop();
    },

    handleScroll() {
      this.showScrollTop = window.scrollY > 100;
    },

    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },

    filterOptionChanged(value) {
      this.showShowAll = true;
      this.displayData = this.countryData.filter(country => {
        return country.region === value;
      });
      this.page = 1;
      this.paginationEvent(this.page);
    },

    showAll() {
      this.$nextTick(() => {
        this.selected = null;
      });
      this.displayData = this.countryData;
      this.page = 1;
      this.paginationEvent(this.page);
      this.showShowAll = false;
    },

    searchCountries(value) {
      if (!value) {
        this.displayData = this.countryData;
      } else {
        value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        this.displayData = this.countryData.filter(result => {
          return result.name.includes(value);
        });
      }
    },

    keyBoardCheck(event) {
      if (event.keyCode === 8) {
      }
    }
  },

  created() {
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 10px !important;
}

.margin-top-0 {
  margin-top: 0 !important;
}

.pos-fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.7);
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: block;
  text-decoration: none;
  -webkit-border-radius: 35px;
  -moz-border-radius: 35px;
  border-radius: 35px;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  &:hover {
    .scroll-top-icon {
      top: 2px;
    }
    background: rgba(0, 0, 0, 0.9);
  }

  .scroll-top-icon {
    color: azure;
    position: relative;
    left: -12px;
    top: 16px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
}
</style>

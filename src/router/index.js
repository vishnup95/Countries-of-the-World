import VueRouter from 'vue-router';
import Vue from "vue";
import Country from '../components/Country';
import Helloworld from "../components/HelloWorld";
import axios from 'axios';

Vue.use(VueRouter);

const routes = [
  {
    path: '/country/:countryName',
    name: 'Country',
    component: Country,
    props: true
  },

  {
    path: '/',
    component: Helloworld
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

export default router;
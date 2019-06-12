import VueRouter from 'vue-router';
import Vue from "vue";

const Country = () => import("../components/Country");
const Helloworld = () => import("../components/HelloWorld");

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
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

export default router;
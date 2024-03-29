import Vue from 'vue';
import VueRouter from 'vue-router';
import Tables from '../views/Tables.vue';
import Requests from '../views/Requests.vue';
import Home from '../views/Home.vue';
import MovieTable from '../components/MovieTable.vue';
import CharacterTable from '../components/CharacterTable.vue';
import QuoteTable from '../components/QuoteTable.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  {
    path: '/tables',
    component: Tables,
    children: [
      {
        path: 'movies',
        component: MovieTable,
      },
      {
        path: 'characters',
        component: CharacterTable,
      },
      {
        path: 'quotes',
        component: QuoteTable,
      },
    ],
  },
  { path: '/requests', component: Requests },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

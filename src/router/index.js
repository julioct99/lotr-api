import Vue from 'vue';
import VueRouter from 'vue-router';
import Tables from '../views/Tables.vue';
import MovieTable from '../components/MovieTable.vue';
import CharacterTable from '../components/CharacterTable.vue';
import QuoteTable from '../components/QuoteTable.vue';

Vue.use(VueRouter);

const routes = [
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

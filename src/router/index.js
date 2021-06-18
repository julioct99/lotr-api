import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MovieTable from '../components/MovieTable.vue';
import CharacterTable from '../components/CharacterTable.vue';
import QuoteTable from '../components/QuoteTable.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/tables',
    component: Home,
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
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

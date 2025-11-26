import { createRouter, createWebHistory } from "vue-router";
import Ejmpractico from "../components/Ejm_practico.vue";
import Examen from "../components/Examen.vue";
import Informacion from "../components/informacion.vue";

const routes = [
  {
    path: "/",
    name: "informacion",
    component: Informacion,
  },
  {
    path: "/ejemplo",
    name: "ejemplos",
    component: Ejmpractico,
  },
  {
    path: "/examen",
    name: "examen",
    component: Examen,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

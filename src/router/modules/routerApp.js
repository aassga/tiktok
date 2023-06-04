import NotFound from "@/views/redirect/NotFound.vue";
import errorWaiting from "@/views/redirect/ErrorIndex.vue";
import error500 from "@/views/redirect/Status500.vue";

export default [
  {
    name: "notFound",
    path: "/404",
    component: NotFound,
  },
  {
    name: "errorWaiting",
    path: "/401",
    component: errorWaiting,
  },
  {
    name: "error500",
    path: "/500",
    component: error500,
  },
  { 
    path: '*', 
    redirect: '/404', 
    hidden: true 
  }
];

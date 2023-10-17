import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import LoginForm from "../views/LoginForm.vue"
import EventList from "../views/EventList.vue"
import EventForm from "../views/EventForm.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "LoginForm",
    component: LoginForm,
    meta: {
      layout: "login",
    },
  },
  {
    path: "/events",
    name: "EventList",
    component: EventList,
    meta: {
      layout: "main",
    },
  },
  {
    path: "/events/new",
    name: "EventForm",
    component: EventForm,
    meta: {
      layout: "main",
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

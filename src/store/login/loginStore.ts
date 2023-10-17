import { defineStore } from "pinia"
import { api } from "@/api/api"
import router from "@/router"
import { Login } from "./types/login"

import { USER_LOCALSTORAGE_KEY } from "@/const"

export const useLoginStore = defineStore({
  id: "loginStore",
  state: () => ({
    loginData: {} as Login | undefined,
  }),
  actions: {
    async setLogin(item: Login) {
      this.loginData = { ...this.loginData, ...item } // isLoading -true
      try {
        const response = await api.post("/login", {
          username: item.username,
          password: item.password,
        })
        if (!response.data) {
          throw new Error()
        }
        item.isLoading = false
        this.loginData = { ...this.loginData, ...item }
        localStorage.setItem(
          USER_LOCALSTORAGE_KEY,
          JSON.stringify(response.data)
        )

        await router.push("/events")
      } catch (error) {
        item.error = "Неправильный логин или пароль"
        item.isLoading = false
        this.loginData = { ...this.loginData, ...item }
        localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        console.error("Navigation failed", error)
      }
    },
    logout() {
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
      this.loginData = undefined
      router.push("/login")
    },
  },
})

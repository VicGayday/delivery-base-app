import { defineStore } from "pinia"
import { USER_LOCALSTORAGE_KEY } from "@/const"
import { User } from "./types/user"

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    userData: {} as User,
  }),

  actions: {
    initAuthData() {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) {
        this.userData = JSON.parse(user)
      }
    },
  },
})

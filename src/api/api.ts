import axios from "axios"
// import router from "../router"

import { USER_LOCALSTORAGE_KEY } from "@/const"

const headerAuth = localStorage.getItem(USER_LOCALSTORAGE_KEY) || ""
console.log("headerAuth", headerAuth)

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    authorization: btoa(encodeURIComponent(headerAuth)) || "",
  },
})
// api.interceptors.response.use(null, (error) => {
//   if (error.response.status === 403) {
//     router.push("/login")
//   }

//   return Promise.reject(error)
// })

export { api }

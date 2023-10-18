import axios from "axios"

import { USER_LOCALSTORAGE_KEY } from "@/const"

const headerAuth = localStorage.getItem(USER_LOCALSTORAGE_KEY) || ""
console.log("headerAuth", headerAuth)

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    authorization: btoa(encodeURIComponent(headerAuth)) || "",
  },
})

export { api }

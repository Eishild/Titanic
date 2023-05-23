import axios from "axios"

const titanicService = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
})

titanicService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

const apiService = {
  async postUser(newUser) {
    try {
      const res = await titanicService.post("/signup", newUser)
      return res
    } catch (error) {
      return error
    }
  },

  async postLogin(user) {
    try {
      const res = await titanicService.post("/signin", user)
      return res
    } catch (error) {
      return error
    }
  },

  async getAllPassengers() {
    try {
      const res = await titanicService.get("/getAllPassengers")
      return res
    } catch (error) {
      return error
    }
  },
}

export default apiService

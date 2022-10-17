import axios from 'axios'
import { createStore } from 'vuex'

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL
axios.defaults.withCredentials = true

//TODO: after socket.io lecture, you need to add here
// const socket = io(process.env.VUE_APP_BASE_URL)

export default createStore({
  state: {},
  mutations: {},
  actions: {
    async fetchStudent(store, id) {
      const usersRequest = await axios.get(`/api/students/${id}`)
      return usersRequest.data
    },
    async fetchStudents() {
      const usersRequest = await axios.get('/api/students')
      return usersRequest.data
    },
  },
  modules: {},
})

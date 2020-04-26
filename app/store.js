import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    accessToken: '',
    currentUser: {
      id: '',
      name: '',
      isAdmin: ''
    },
    firstUserBooking: {
      user_id: '',
      booking_type: '',
      booking_date: '',
      booking_time: ''
    },
    bookings: [],
    listUsers:[],
    users: [],
    bookingsByUserIdForAdmin: [],
    todaysBookings: [],
    todaysClasses: []
  },
  getters: {
    accessToken: state => {
      return state.accessToken
    },
    username: state => {
      return state.currentUser.name
    },
    isAdmin: state => {
      return state.currentUser.isAdmin
    },
    firstUserBooking: state => {
      if(state.firstUserBooking.booking_type === ''){
        return 'No bookings'
      } else {
        let data = state.firstUserBooking.booking_type === 'Private' ? '1-on-1 with Christopher Shannon' : state.firstUserBooking.booking_type + ' - ' + state.firstUserBooking.booking_date + '@' + state.firstUserBooking.booking_time
        return data
      }
    },
    bookings: state => {
      return state.bookings
    },
    showUsers: state => {
      return state.users
    },
    showListUsers: state => {
      return state.listUsers
    },
    bookingsByUserIdForAdmin: state => {
      return state.bookingsByUserIdForAdmin
    },
    todaysBookings: state => {
      return state.todaysBookings
    },
    todaysClasses: state => {
      return state.todaysClasses
    }
  },
  mutations: {
    setUserAccessToken(state, data){
      state.accessToken = data
    },
    setIsLoggedIn(state, data){
      state.isLoggedIn = data
    },
    setUserInformation(state, data){
      console.log(data.isAdmin)
      state.currentUser.id = data.id
      state.currentUser.name = data.name
      state.currentUser.isAdmin = data.isAdmin
    },
    setUserBookings(state, data){
      state.bookings = data
    },
    setFirstUserBooking(state, data){
      console.log(data.length)
      state.firstUserBooking.user_id = data[0].user_id
      state.firstUserBooking.booking_date = data[0].date
      state.firstUserBooking.booking_time = data[0].time
      state.firstUserBooking.booking_type = data[0].booking_type
    },
    setUsers(state, data){
      state.users = data
    },
    setListUsers(state, data){
      state.listUsers = data
    },
    setUserBookingsByIdForAdmin(state, data){
      state.bookingsByUserIdForAdmin = data
    },
    setTodaysBookings(state, data){
      state.todaysBookings = data
    },
    setTodaysClasses(state, data){
      state.todaysClasses = data
    }
  },
  actions: {
    login({commit}, data){
      console.log(data.username)
      return new Promise(function(resolve, reject){
        axios.post('http://127.0.0.1:8888/example-project/public/api/login', {
          username: data.username,
          password: data.password})
            .then((response) => {
              console.log('Here in')
              commit('setUserAccessToken', response.data.access_token)
              commit('setIsLoggedIn', true)
              resolve(response)
            })
            .catch((error) => {
              alert({
                title: "Oops!",
                message: "Something went wrong. Please try again",
                okButtonText: "Close"
              })
              reject(error)
        })
      })
    },
    register({commit}, data){
      console.log(data.name)
      console.log(data.email)
      console.log(data.password)
      return new Promise(function(resolve, reject){
        axios.post('http://127.0.0.1:8888/example-project/public/api/register', data)
            .then((response) => {
              console.log('Here in')
              resolve(response)
            })
            .catch((error) => {
              console.log(error.response.data)
              alert({
                title: "Oops!",
                message: error.response.data,
                okButtonText: "Close"
              })
              reject(error)
        })
      })
    },
    getUserInformation({commit, state, dispatch},){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.accessToken

      axios.get('http://127.0.0.1:8888/example-project/public/api/user')
        .then((response) => {
          commit('setUserInformation', response.data)
          // if (response.data.isAdmin === 1) {
          //   dispatch('getAllBookingsForAdmin')
          //   dispatch('getAllUsersForAdmin')
          // } else {
            dispatch('getUserBookings', response.data.id)
          // }
        })
        .catch((error) => {
          commit('setUserInformation', error.response.status)
        })
    },
    getUserBookings({commit}, data) {
      axios.get('http://127.0.0.1:8888/example-project/public/api/user/' + data)
        .then((response) => {
          commit('setUserBookings', response.data)
          commit('setFirstUserBooking', response.data)
        })
        .catch((error) =>{
          commit('setUserBooking', error.response.status)
        })
    },
    getAllClientsForDropBooking({commit}){
      axios.get('http://127.0.0.1:8888/example-project/public/api/admin/clients')
        .then((response) => {
          commit('setListUsers', response.data)
        })
        .catch((error) =>{
          console.log(error)
        })
    },
    getAllClients({commit}){
      axios.get('http://127.0.0.1:8888/example-project/public/api/admin/users')
        .then((response) => {
          commit('setUsers', response.data)
        })
        .catch((error) =>{
          console.log(error)
        })
    },
    getUserBookingsByIdForAdmin({commit}, data){
      // console.log(data)
      axios.get('http://127.0.0.1:8888/example-project/public/api/admin/clients/bookings/' + data)
        .then((response) => {
          commit('setUserBookingsByIdForAdmin', response.data)
        })
        .catch((error) =>{
          console.log(error)
        })
    },
    getTodaysBookingsForAdmin({commit}, data){
      axios.get('http://127.0.0.1:8888/example-project/public/api/admin/todaysbookings')
        .then((response) => {
          commit('setTodaysBookings', response.data)
        })
        .catch((error) =>{
          console.log(error)
        })
    },
    getTodaysClassesForAdmin({commit}, data){
      axios.get('http://127.0.0.1:8888/example-project/public/api/admin/classes/today')
        .then((response) => {
          commit('setTodaysClasses', response.data)
        })
        .catch((error) =>{
          console.log(error)
        })
    },
    createBookingForUser({commit}, data){
      return new Promise(function(resolve, reject){
        axios.post('http://127.0.0.1:8888/example-project/public/api/bookings', data)
            .then((response) => {
              // commit('setUserAccessToken', response.data.access_token)
              // commit('setIsLoggedIn', true)
              resolve(response)
            })
            .catch((error) => {
              reject(error)
        })
      })
    },
    updateBookingForUser({commit}, data){
      let newData = {
        username: data.username,
        date: data.date,
        booking_type: data.booking_type,
        time: data.time
      }
      return new Promise(function(resolve, reject){
        axios.post('http://127.0.0.1:8888/example-project/public/api/admin/update/' + data.id, newData)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error)
        })
      })
    },
    removeClientBooking({commit}, data){
      return new Promise(function(resolve, reject){
        axios.delete('http://127.0.0.1:8888/example-project/public/api/admin/remove/' + data)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error)
        })
      })
    },
    confirmBooking({commit}, data){
      return new Promise(function(resolve, reject){
        axios.put('http://127.0.0.1:8888/example-project/public/api/admin/classes/book/' + data)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error)
        })
      })
    }
  }
});

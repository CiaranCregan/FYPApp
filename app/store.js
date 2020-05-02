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
      emai: '',
      isAdmin: ''
    },
    profileInformation: [],
    firstUserBooking: {
      user_id: '',
      booking_type: '',
      booking_date: '',
      booking_time: ''
    },
    bookings: [],
    futureBookings: [],
    pastBookings: [],
    listUsers:[],
    users: [],
    bookingsByUserIdForAdmin: [],
    todaysBookings: [],
    todaysClasses: [],
    allFutureClasses: [],
    myClasses: [],
    confirmsForClass: []
  },
  getters: {
    accessToken: state => {
      return state.accessToken
    },
    userId: state => {
      return state.currentUser.id
    },
    email: state => {
      return state.currentUser.email
    },
    name: state => {
      return state.currentUser.name
    },
    username: state => {
      return state.currentUser.name
    },
    isAdmin: state => {
      return state.currentUser.isAdmin
    },
    firstUserBooking: state => {
      if(state.firstUserBooking.booking_type === ''){
        return 'No bookings scheduled for today. Click to see your previous and future bookings'
      } else {
        let data = `You have a 1-on-1 with Christopher Shannon @ ${state.firstUserBooking.booking_time} today`
        return data
      }
    },
    bookings: state => {
      return state.bookings
    },
    futurebookings: state => {
      return state.futureBookings
    },
    pastbookings: state => {
      return state.pastBookings
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
    },
    allClasses: state => {
      return state.allFutureClasses
    },
    myClasses: state => {
      return state.myClasses
    },
    getConfirmsForClass: state => {
      return state.confirmsForClass
    },
    getProfileInformation: state => {
      return state.profileInformation
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
      state.currentUser.email = data.email
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
    },
    setAllFutureClasses(state, data){
      state.allFutureClasses = data
    },
    setMyClasses(state, data){
      state.myClasses = data
    },
    setConfirmsForClass(state, data){
      state.confirmsForClass = data
    },
    setFutureBookings(state, data){
      state.futureBookings = data
    },
    setPastBookings(state, data){
      state.pastBookings = data
    },
    setProfileInformation(state, data){
      state.profileInformation = data
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
    logout({commit, state}){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.accessToken

      return new Promise(function(resolve, reject){
        axios.post('http://127.0.0.1:8888/example-project/public/api/logout')
            .then((response) => {
              state.accessToken = ''
              state.isLoggedIn = false
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
            dispatch('classesConfirmed', response.data.id)
          // }
        })
        .catch((error) => {
          commit('setUserInformation', error.response.status)
        })
    },
    getUserBookings({commit}, data) {
      axios.get('http://127.0.0.1:8888/example-project/public/api/user/today/' + data)
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
    getFutureClasses({commit}, data){
      axios.get('http://127.0.0.1:8888/example-project/public/api/user/classes')
        .then((response) => {
          console.log(response.data)
          commit('setAllFutureClasses', response.data)
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
    createClass({commit}, data){
      return new Promise(function(resolve, reject){
        axios.post('http://127.0.0.1:8888/example-project/public/api/admin/classes/create', data)
            .then((response) => {
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
      console.log(data)
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
    removeClass({commit}, data){
      return new Promise(function(resolve, reject){
        axios.delete('http://127.0.0.1:8888/example-project/public/api/admin/classes/remove/' + data)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error)
        })
      })
    },
    getConfimsForThisClass({commit}, data){
      axios.get('http://127.0.0.1:8888/example-project/public/api/admin/classes/going/' + data)
            .then((response) => {
              commit('setConfirmsForClass', response.data)
              resolve(response)
            })
            .catch((error) => {
              reject(error)
        })
    },
    checkAttendance({commit}, data){
      axios.get('http://127.0.0.1:8888/example-project/public/api/user/classes/going/' + data)
            .then((response) => {
              commit('setConfirmsForClass', response.data)
              resolve(response)
            })
            .catch((error) => {
              reject(error)
        })
    },
    confirmBooking({commit}, data){
      return new Promise(function(resolve, reject){
        axios.put('http://127.0.0.1:8888/example-project/public/api/admin/classes/book/' + data.class_id + '/' + data.user_id)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error)
        })
      })
    },
    removeBooking({commit}, data){
      return new Promise(function(resolve, reject){
        axios.put('http://127.0.0.1:8888/example-project/public/api/admin/classes/removebooking/' + data.class_id + '/' + data.user_id)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error)
        })
      })
    },
    myClasses({commit, state}, data){
      console.log('Hello')
      axios.get('http://127.0.0.1:8888/example-project/public/api/user/classes/myclasses/' + state.currentUser.id)
          .then((response) => {
            commit('setMyClasses', response.data)
            // resolve(response)
          })
          .catch((error) => {
            console.log(error)
            // reject(error)
      })
    },
    clientFutureBookings({commit, state}){
      axios.get('http://127.0.0.1:8888/example-project/public/api/user/future/' + state.currentUser.id)
          .then((response) => {
            commit('setFutureBookings', response.data)
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
      })
    },
    clientPastBookings({commit, state}){
      axios.get('http://127.0.0.1:8888/example-project/public/api/user/all/' + state.currentUser.id)
          .then((response) => {
            commit('setPastBookings', response.data)
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
      })
    },
    updateProfileInformation({commit, state}, data){
      console.log(state.currentUser.id)
      return new Promise(function(resolve, reject){
        axios.post('http://127.0.0.1:8888/example-project/public/api/user/profile/update/' + state.currentUser.id, data)
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

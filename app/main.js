import Vue from 'nativescript-vue'
// import CalendarView from 'nativescript-ui-calendar/vue';
import { Fontawesome } from 'nativescript-fontawesome';

import Login from './screens/Login'

import store from './store'

let loggedInState = store.state.isLoggedIn

// Vue.use(CalendarView);
Fontawesome.init();  
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement(
  'PullToRefresh',
  () => require('nativescript-pulltorefresh').PullToRefresh
);
Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)
Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);

new Vue({
  store,
  render: h => h('frame', [h(Login)])
}).$start()

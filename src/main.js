import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import router from './router'
import {store} from './store'
import DateFilter from './filters/data'
import * as firebase from 'firebase'
import AlertComp from './components/shared/Alert'
import EditMeetupDetailsDialog from './components/meetup/edit/EditMeetupDetailsDialog'
import EditMeetupDateDialog from './components/meetup/edit/EditMeetupDateDialog'
import EditMeetupTimeDialog from './components/meetup/edit/EditMeetupTimeDialog'
import RegistrationDialog from './components/meetup/registration/RegistrationDialog'
// register global filter
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegistrationDialog)

Vue.use(Vuetify, {
  theme: {
    primary: '#0091ea',
    secondary: '#707b82',
    accept: '#19be6b',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created: function () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDTRENbX9HUKYYLVGJnGU7A9C1rPAsqnZg',
      authDomain: 'nicetome-panda.firebaseapp.com',
      databaseURL: 'https://nicetome-panda.firebaseio.com',
      projectId: 'nicetome-panda',
      storageBucket: 'nicetome-panda.appspot.com'
    })
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.$store.dispatch('autoSignIn', user)
          this.$store.dispatch('fetchUserData')
        }
      })
    this.$store.dispatch('loadMeetups')
  }
})

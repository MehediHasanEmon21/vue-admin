import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';
let token = localStorage.getItem('token') ? true : false;

if(token){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token');
}

export default axios;

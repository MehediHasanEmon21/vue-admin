<template>
  <v-app id="inspire">
    
     <Sidebar :drawer="drawer"></Sidebar>
     <Header @showSidebar="showSidebar"></Header>

    <v-main>
      <router-view></router-view>
    </v-main>
  
  </v-app>
</template>

<script>
import Header from './inc/Header.vue'
import Sidebar from './inc/Sidebar.vue'
export default {
    name: 'AdminLayout',
    components: { Header, Sidebar },
    data(){
        return {
            drawer: true
        }
    },
    created(){
      this.authUser();
    },
    methods: {
        showSidebar(){
            this.drawer = !this.drawer;
        }
    }
   
}
</script>

<style>

</style>
<template>
  <v-container>
    <v-row>
      <h2>Dashboard {{user.name}}</h2>
    </v-row>
    <!-- <snackbar :messageProp="snackbar.message" :snackbarProp="snackbar.status" :colorProp="snackbar.color"></snackbar> -->
  </v-container>
  
</template>

<script>
export default {
    name: 'Dashboard',
    data(){
      return {
        // snackbar: {
        //     status: true,
        //     message: 'Logged In Successfully',
        //     color: 'green'
        // },
      }
    },
    
  }
</script>

<style>

</style>
<template>
  <v-container>
    <v-row>
 
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <div>
            <h2 class="not-per">Dashboard</h2>
          </div>
        </v-col>
        <v-col cols="3"></v-col>
   
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'Dashboard',
    data(){
      return {
      }
    },
    
  }
</script>

<style scoped>
  .not-per{
    background: green;
    text-align: center;
    padding: 43px;
    color: white;
    font-family: cursive;
    border-radius: 10px;
  }
</style>
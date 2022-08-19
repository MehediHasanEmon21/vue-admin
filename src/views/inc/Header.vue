<template>
   <v-app-bar app>
      <v-app-bar-nav-icon @click="$emit('showSidebar')"></v-app-bar-nav-icon>

      <v-toolbar-title>Admin Panel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
      
        <v-avatar
              v-bind="attrs"
              v-on="on"
              color="brown"
              size="35"
            >
              <span class="white--text text-h6">EM</span>
        </v-avatar>
    
      </template>
      <v-list dense>
      <v-subheader>ACTIONS</v-subheader>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item @click.prevent="signOut">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-menu>
    </v-app-bar>
</template>

<script>
export default {
    name: 'Header',
    data(){
        return {
            items: [
                { text: 'Profile', icon: 'mdi-account' },
            ],
        }
    },
    methods: {
        async signOut(){
            try{
                let { data } = await this.$axios.post('/logout');
                if(!data.error){
                    localStorage.removeItem('token');
                    this.$router.push({path: '/login'});
                }else{
                    alert('Something Wrong');
                }
            }catch(e){
                console.log(e);
            }
            
        }
    }
}
</script>

<style>

</style>
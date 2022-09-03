<template>
  <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.role?.name }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        > 
          <template v-for="(item, i) in items">
            <v-list-item
            link
            :to="item.url"
            v-if="checkAccess(item.url)"
            :key="i"
          >  
            
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
           
            
          </v-list-item>
          </template>
          
        </v-list-item-group>
      </v-list>
      <!--  -->
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'Sidebar',
    props: ["drawer"],
     data(){
        return {
            selectedItem: 0,
            items: [
                { text: 'Dashboard', icon: 'mdi-folder', url: '/admin/dashboard' },
                { text: 'Role', icon: 'mdi-application-brackets', url: '/admin/role' },
                { text: 'Assign Role', icon: 'mdi-shield-lock', url: '/admin/assign-role' },
                { text: 'Users', icon: 'mdi-account-multiple', url: '/admin/user' },
            ],
        }
    }
}
</script>

<style>

</style>
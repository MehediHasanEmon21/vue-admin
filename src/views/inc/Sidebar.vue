<template>
  <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              John Leider
            </v-list-item-title>
            <v-list-item-subtitle>{{user.name}}</v-list-item-subtitle>
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
          <v-list-item
            link
            v-for="(item, i) in items"
            :key="i"
            :to="item.url"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
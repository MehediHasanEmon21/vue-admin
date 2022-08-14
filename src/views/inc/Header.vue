<template>
   <v-app-bar app>
      <v-app-bar-nav-icon @click="$emit('showSidebar')"></v-app-bar-nav-icon>

      <v-toolbar-title>Admin Panel</v-toolbar-title>
    </v-app-bar>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>

</style>
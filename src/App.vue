<template>
<v-app id="inspire">
  <router-view></router-view>
  <vtoast ref="vtoast"/>
</v-app>
</template>

<script>
import vtoast from '../src/views/utils/Snackbar.vue'
export default {
  name: 'App',
  components: {
    vtoast
  },
  mounted() {
      this.$root.vtoast = this.$refs.vtoast
  },
  data: () => ({
    //
  }),
};
</script>

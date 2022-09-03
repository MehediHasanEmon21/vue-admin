import { mapGetters } from 'vuex'
export default {
  methods: {
    async authUser() {
      try {
        let { data } = await this.$axios.post('/me');
        if (!data.error) {
          this.$store.dispatch("user/getUser", data.data);
        }
        else {
          console.log('Something Went Wrong');
        }
        this.checkResourcesAccess();
      } catch (e) {
        console.log(e);
      }
    },
    checkResourcesAccess() {
      let path = this.$route.name;
      let hasResourceAccess = this.checkAccess(path);
      if (!hasResourceAccess) {
        this.$router.push('/admin/403');
      }

    },
    checkAccess(name) {
      const permissions = this.user?.role?.permissions ? JSON.parse(this.user.role.permissions) : null;
      let hasAccess = false;
      if (permissions) {
        permissions.forEach(permission => {
          if (permission.name == name) {
            if (permission.read) {
              hasAccess = true;
            }
          }
        });
      }
      return hasAccess;
    },
    checkPerExists(accessName){
      
      let route_path = this.$route.name;
      const permissions = this.user?.role?.permissions ? JSON.parse(this.user.role.permissions) : null;
      let hasAccess = false;
      if (permissions) {
        permissions.forEach(permission => {
          if (permission.name == route_path) {
            if (permission[accessName]) {
              hasAccess = true;
            }
          }
        });
      }
      return hasAccess;
    }
  },
  computed: {
    ...mapGetters({
      'user': 'user/getUser'
    }),
    isReadPermitted(){
      return this.checkPerExists('read');
    },
    isWritePermitted(){
      return this.checkPerExists('write');
    },
    isUpdatePermitted(){
      return this.checkPerExists('update');
    },
    isDeletePermitted(){
      return this.checkPerExists('delete');
    },



  }
}
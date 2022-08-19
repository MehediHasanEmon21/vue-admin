import { mapGetters } from 'vuex'
export default {
    methods: {
        async authUser(){
         try{
           let { data } = await this.$axios.post('/me');
           if(!data.error){
             this.$store.dispatch("user/getUser",data.data);
           }
           else{
             console.log('Something Went Wrong');
           }
   
         }catch(e){
           console.log(e);
         }
       }
    },
    computed: {
        ...mapGetters({
            'user' : 'user/getUser'
        }),
        
     }
}
<template>
    <v-dialog
        v-model="dialogDataProp"
        max-width="500"
        @click:outside="$emit('closeDialog')"
        eager
        >
            <v-card>
                <!-- modal header -->
                    <v-card-title class="text-h5 grey lighten-2">
                        {{mdalTitle}}
                    </v-card-title>
                    <!-- modal header end -->

                    <!-- modal content -->
                    <v-card-text class="mt-5">
                        <slot name="content"></slot>
                    </v-card-text>
                    <!-- modal content end -->

                    <!-- modal footer -->
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="green darken-1"
                            text
                            @click="$emit('closeDialog')"
                        >
                            Cancel
                        </v-btn>
                        <slot name="acton"></slot>
                    </v-card-actions>
                <!-- modal footer end -->
                
            </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'Modal',
    data(){
        return {
            
        }
    },
    props: ['dialog','mdalTitle'],
    computed: {
        dialogDataProp: {
            get(){
                return this.dialog;
            },
            set(){

            }
        }
    }
  
}
</script>

<style>

</style>
<template>
  <v-dialog v-model="dialogDeleteDataProp" max-width="500px" @click:outside="$emit('closeDelete')">
    <v-card>
        <v-card-title class="text-h5">
            <slot name="deleteContent"></slot>
        </v-card-title>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('closeDelete')">Cancel</v-btn>
        <slot name="deleteAction"></slot>
        <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'DeleteModal',
    data(){
        return {
            
        }
    },
    props: ['dialogDelete'],
    computed: {
        dialogDeleteDataProp: {
            get(){
                return this.dialogDelete;
            },
            set(){}
        }
    }
}
</script>

<style>

</style>
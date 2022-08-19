<template>
    <v-snackbar
        v-model="snacbarStatusProp"
        right
        top
        :color="snacbarColorProp"
        >
        {{ snacbarMessageProp }}

        <template v-slot:action="{ attrs }">
            <v-btn
            text
            x-small
            v-bind="attrs"
            @click="snackbar = false"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: 'Snackbar',
    props: ["snackbar","message","color"],
    computed: {
        snacbarStatusProp: {
            get(){
                return this.snackbar;
            },
            set(){}
        },
        snacbarMessageProp: {
            get(){
                return this.message;
            },
            set(){}
        },
        snacbarColorProp: {
            get(){
                return this.color;
            },
            set(){}
        },

    }
}
</script>

<style>

</style>
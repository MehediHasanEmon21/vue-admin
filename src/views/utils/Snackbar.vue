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
            @click="snackbarProp = false"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: 'Snackbar',
    props: ["snackbarProp","messageProp","colorProp"],
    computed: {
        snacbarStatusProp: {
            get(){
                return this.snackbarProp;
            },
            set(){}
        },
        snacbarMessageProp: {
            get(){
                return this.messageProp;
            },
            set(){}
        },
        snacbarColorProp: {
            get(){
                return this.colorProp;
            },
            set(){}
        },

    }
}
</script>

<style>

</style>
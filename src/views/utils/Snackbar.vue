<template>
    <v-snackbar
        :color="color"
        v-model="showSnackbar"
        right
        top

        >
        {{ message }}

        <template v-slot:action="{ attrs }">
            <v-btn
            text
            x-small
            v-bind="attrs"
            @click="snackbarProp = false"
            >
            <!-- <v-icon>mdi-close</v-icon> -->
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: 'Snackbar',
    data() {
        return{
        showSnackbar: false,
        message: '',
        color: 'success',
        icon: 'mdi-check',
        timer: 3000
        }
    },
    methods: {
        show(data) {
            this.message = data.message || 'missing "message".';
            this.color = data.color || 'success';
            this.showSnackbar = true;
        }
    }

}

</script>

<style>

</style>
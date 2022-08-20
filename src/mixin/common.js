export default {
    data(){
        return {
            snackbar: {
                status: false,
                message: '',
                color: ''
            },
        }
    },
    methods: {
        snacBarError(status, message, color){
            this.snackbar.status = status;
            this.snackbar.message = message;
            this.snackbar.color = color;
        },
        snacBarSuccess(status, message, color){
            this.snackbar.status = status;
            this.snackbar.message = message;
            this.snackbar.color = color;
        },

    }
}
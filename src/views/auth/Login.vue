<template>
  <div>
        <v-app>
            <v-main class="d-flex justify-center align-center">
                <v-container fluid>
                    <v-row class="justify-center align-center">
                        <v-col lg="4" md="6" sm="12">
                            <v-card class="elevation-12">
                                <v-form ref="form">
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title>Login form</v-toolbar-title>
                                </v-toolbar>

                                <v-card-text>
                                        <v-text-field
                                            prepend-icon="mdi-account"
                                            label="Email"
                                            type="email"
                                            v-model="form.email"
                                            :rules="emailRules"
                                        ></v-text-field>
                                        <v-text-field
                                            prepend-icon="mdi-lock"
                                            label="Password"
                                            :type="showPassword ? 'text' : 'password'"
                                            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                            @click:append="showPassword = !showPassword"
                                            v-model="form.password"
                                            :rules="passwordRules"
                                        ></v-text-field>
                                    
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click.prevent="submitLogin" type="submit" color="primary">Login</v-btn>
                                </v-card-actions>
                                
                                </v-form>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-app>
  </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            showPassword: false,
            form: {
                email: '',
                password: ''
            },
            passwordRules: [
                v => !!v || 'Email is required',
                v => (v && v.length >= 8) || 'Password must be greater than 8 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    methods: {
        submitLogin(){
            if(this.$refs.form.validate()){
                console.log(this.form);
            }
        }
    }
}
</script>

<style>

</style>
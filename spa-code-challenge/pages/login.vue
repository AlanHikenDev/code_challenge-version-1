<template>
    <section class="section">
      
            <h2 class="title has-text-centered">Login</h2>
  
            <form method="post" @submit.prevent="login">
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>
  
                <v-text-field
                    v-model="password"
                    :rules="nameRules"
                    label="E-mail"
                    type="password"
                    required
                ></v-text-field>
  
              <b-button type="is-dark is-fullwidth" native-type="submit">
                Login
              </b-button>
            </form>
    </section>
  </template>
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        nameRules: [
        v => !!v || 'Name is required',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid', //regex para correo valido
        ],
      }
    },
    methods: {
      async login() {
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
  
       this.$router.push('/')
      },
    },
  }
  </script>
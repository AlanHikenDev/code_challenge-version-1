<template>
    <v-row>
      <v-col cols="1" sm="2" md="4" lg="4"></v-col>
      <v-col cols="10" sm="8" md="4" lg="4">
        <div></div>
        <v-card class="pa-3" outlined elevation="0">
          <div class="text-center">Code challenge - Register </div>
          <v-card-text>
            <v-text-field 
              prepend-icon="mdi-account"
              label="Nombre"
              v-model="name"
              :rules="[ v => !!v || 'Nombre is required']"
            ></v-text-field>
            <v-text-field 
              prepend-icon="mdi-account"
              label="Email"
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field 
              prepend-icon="mdi-lock"
              label="Contraseña"
              v-model="password"
              :type="show2 ? 'text' : 'password'"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="success" @click="login">Registrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="1" sm="2" md="4" lg="4"></v-col>
    </v-row>
  </template>
  
  <script>
  
  export default {
    auth: false,
    data () {
      return {
        password: null,
        email: null,
        name :null,
        show2: false ,
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid', //regex para correo valido
        ],
      }
    },
    methods: {
      login () {
        this.$axios.post('api/users/register',{
            name:this.name,
			email: this.email,
			password: this.password,		
        }).then((response) => {
          alert('registro exitoso',response)
        })
          },
    }
  }
  </script>
  
<template>
  <v-row>
    <v-col cols="1" sm="2" md="4" lg="4"></v-col>
    <v-col cols="10" sm="8" md="4" lg="4">
      <div></div>
      <v-card class="pa-3" outlined elevation="0">
        <div class="text-center">Code challenge </div>
        <v-card-text>
          <v-text-field 
            prepend-icon="mdi-account"
            label="Email"
            :rules="emailRules"
            v-model="email"
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
          <v-btn block color="success" @click="login">Ingresar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="1" sm="2" md="4" lg="4"></v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      password: null,
      email: null,
      show2: false,
      emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid', //regex para correo valido
        ],
        
    }
  },
  methods: {
    login () {
			this.$axios.get('/sanctum/csrf-cookie', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				},
				withCredentials: true,
			}).then((response1) => { 
        
				this.$auth.loginWith('local', {
					data: {
						email: this.email,
						password: this.password,
					},
				}).then((response) => {
					// this.$auth.setUser(response.data.username)
          this.$store.commit('user/setRol', response.data.user.rol)
          localStorage.setItem('userId', response.data.user.id)
          localStorage.setItem('rol', response.data.user.rol)
          console.log('seteando rol', this.$store.state.user.rol)
          //redirect 
				});
			});
		},
  }
}
</script>

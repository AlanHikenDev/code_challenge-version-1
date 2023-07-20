<template>
    <v-card>
       <v-card-title> Guardar Cliente </v-card-title>
       <v-card-text>
   <v-form
     ref="form"
     v-model="valid"
     lazy-validation
   >
     <v-text-field
       v-model="cliente.name"
       :counter="10"
       :rules="nameRules"
       label="Name"
       required
     ></v-text-field>
     <v-text-field
       v-model="cliente.last_name"
       :counter="10"
       :rules="nameRules"
       label="Name"
       required
     ></v-text-field>
 
     <v-text-field
       v-model="cliente.email"
       :rules="emailRules"
       label="E-mail"
       required
     ></v-text-field>
 
     <v-btn
       :disabled="!valid"
       color="success"
       class="mr-4"
       @click="validate"
     >
       Validate
     </v-btn>
 
     <v-btn
       color="error"
       class="mr-4"
       @click="reset"
     >
       Reset Form
     </v-btn>
 
     <v-btn
       color="warning"
       @click="resetValidation"
     >
       Reset Validation
     </v-btn>
   </v-form>
</v-card-text>
</v-card>
 </template>
 <script>
 import { mapActions } from 'vuex'
 export default {
    props: {
        item: {
            type: Object,
            default() {
                return {}
            }
        }
    },
   data: () => ({
     valid: true,
     name: '',
     nameRules: [
       v => !!v || 'Name is required',
       v => (v && v.length <= 30) || 'Name must be less than 10 characters',
     ],
     cliente: {
       name: null,
       last_name : null,
       email :null
     },
     email: '',
     emailRules: [
       v => !!v || 'E-mail is required',
       v => /.+@.+\..+/.test(v) || 'E-mail must be valid', //regex para correo valido
     ]
   }),
   mounted(){
        
        let cliente = {
            name: this.item.name,
            last_name : this.item.last_name,
            email :this.item.email,
            id:this.item.id
        }
        this.cliente = cliente
   },
   methods: {
   ...mapActions({
     actualizarClients: 'client/actualizar' 
   }),
    async validate () {
       if (this.$refs.form.validate()){
          await this.actualizarClients(this.cliente)
           this.$emit('guardar')
       }
     },
     reset () {
       this.$refs.form.reset()
     },
     resetValidation () {
       this.$refs.form.resetValidation()
     },
   },
 }
</script>
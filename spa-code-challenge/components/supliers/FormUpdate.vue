<template>
    <v-card>
       <v-card-title> update suplier </v-card-title>
       <v-card-text>
   <v-form
     ref="form"
     v-model="valid"
     lazy-validation
   >
   <v-text-field
        v-model="suplier.name"
        :counter="10"
        :rules="nameRules"
        label="Name"
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
     suplier: {
        name: null,
      },
     email: '',
     emailRules: [
       v => !!v || 'E-mail is required',
       v => /.+@.+\..+/.test(v) || 'E-mail must be valid', //regex para correo valido
     ]
   }),
   mounted(){
        
        let suplier = {
          name: this.item.name,
          id:this.item.id
        }
        this.suplier = suplier
   },
   methods: {
   ...mapActions({
     actualizarSuplier: 'suplier/actualizar' 
   }),
    async validate () {
       if (this.$refs.form.validate()){
          await this.actualizarSuplier(this.suplier)
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
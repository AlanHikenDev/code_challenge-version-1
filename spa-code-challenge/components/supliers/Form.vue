<template>
     <v-card>
        <v-card-title> Save suplier </v-card-title>
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
        Save
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
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 10 characters',
      ],
      suplier: {
        name: null 
      }
    }),

    methods: {
    ...mapActions({
      guardarSuplier: 'suplier/guardar' 
    }),
      async validate () {
        if (this.$refs.form.validate()){
            await this.guardarSuplier(this.suplier)
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
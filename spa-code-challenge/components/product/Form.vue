<template>
     <v-card>
        <v-card-title> Save product </v-card-title>
        <v-card-text>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="product.name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="product.description"
        :counter="10"
        :rules="nameRules"
        label="Description"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="product.price"
        label="price"
        :rules="nameRules"
        required
      ></v-text-field>

      <v-text-field
        v-model="product.quantity"
        label="quantity"
        :rules="nameRules"
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
      product: {
        name: null,
        description : null,
        price : null,
        quantity : null
      },
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid', //regex para correo valido
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
    ...mapActions({
      guardarProduct: 'product/guardar' 
    }),
      async validate () {
        if (this.$refs.form.validate()){
            await this.guardarProduct(this.product)
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
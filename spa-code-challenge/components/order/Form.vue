<template>
  <v-card>
    <v-card-title> Save order </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="order.order_number" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

        <v-select v-model="order.cliente_id" :items="clientes" item-text="name" item-value="id" label="Client"></v-select>

        <v-select v-model="order.productos" :items="productos" item-text="name" item-value="id"  label="Select Product" multiple>
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 10">
              <span>{{ item.name }}</span>
            </v-chip>
            
          </template>
        </v-select>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
          Save
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Reset Form
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
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
    order: {
      cliente_id: null,
      productos: [],
      order_number: null
    },
    productos: [],
    clientes: []
  }),
  async mounted() {
    this.clientes = await this.listarClients()
    this.productos = await this.listarProducts()
    console.log(this.clientes)
  },
  methods: {
    ...mapActions({
      guardarOrder: 'order/guardar',
      listarClients: 'client/listar',
      listarProducts: 'product/listar',
    }),
    async validate() {
      if (this.$refs.form.validate()) {
        await this.guardarOrder(this.order)
        this.$emit('guardar')
      }

    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
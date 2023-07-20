<template>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            Products
            <v-spacer />
            <v-btn color="primary" @click="agregar"> Agregar </v-btn>
          </v-card-title>
          <v-card-text>
            <v-simple-table v-if="datos">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">
                    Name
                </th>
                <th class="text-left">
                    Description
                </th>
                <th class="text-left">
                    Price
                </th>
                <th class="text-left">
                    quantity
                </th>
                <th class="text-left">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody >
                <tr
                v-for="(item, index) in datos"
                :key="index"
                >
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.quantity }}</td>
                <td> 
                    <v-btn color="primary" @click="actualizar(item)" > Editar </v-btn>
                    <v-btn color="red" @click="eliminar(item)"> Eliminar </v-btn>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-dialog v-model="modalCrear">
         <ProductForm v-if="modalCrear" v-on:guardar="cerrarAgregar"></ProductForm>
        </v-dialog>
        <v-dialog v-model="modalUpdate">
         <ProductFormUpdate v-if="modalUpdate" :item="product" v-on:guardar="cerrarActualizar"></ProductFormUpdate>
        </v-dialog>
          
        <v-dialog max-width="480" v-model="modalDelete">
          <v-card> 
            <v-card-title>
                Desea eliminar 
            </v-card-title>
            <v-card-actions>
                <v-btn color="red" @click="confirmDelete"> Eliminar </v-btn>
                <v-btn color="primary" @click="modalDelete=false" > Cancelar </v-btn>
            </v-card-actions>
          </v-card> 
        </v-dialog>
          </v-card-text>
          <v-card-actions>
           
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  export default {
    name: 'IndexClients',
    data () {
    return {
      busqueda: null,
      product : null,
      modalCrear : false,
      modalUpdate : false,
      modalDelete : false, 
      datos: [], 
    }
  },
  mounted() {
      this.cargarProductos()
  },
  methods: {
    agregar () {
        this.modalCrear = true
    },
    cerrarAgregar () {
        this.modalCrear = false
        this.cargarProductos()
    },
    actualizar( product)
    {   this.product = product
        this.modalUpdate = true
    },
    cerrarActualizar(){
        this.modalUpdate = false
        this.cargarProductos()
    },
    eliminar(product){
        this.modalDelete = true
        this.product = product
    },
    async confirmDelete(){
        this.modalDelete = false
        await this.deleteProduct(this.product)
        this.cargarProductos()
    },
    async cargarProductos () {
      
        this.datos = await this.listarProducts()
    },
    ...mapActions({
      listarProducts: 'product/listar',
      deleteProduct: 'product/eliminar' 
    }),
  }
  }
  </script>
  
<template>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            Orders
            <v-spacer />
            <v-btn color="primary" @click="agregar"> Agregar </v-btn>
          </v-card-title>
          <v-card-text>
            <v-simple-table v-if="datos">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">
                    Numero de orden 
                </th>
                <th class="text-left">
                    Cliente
                </th>
                <th class="text-left">
                    Cantidad de productos
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
                <td>{{ item.order_number }}</td>
                <td>{{ item.client.name }} {{ item.client.last_name }}</td>
                <td>{{ item.order_detail.length }}</td>
                <td>
                    <v-btn color="primary" @click="ver(item)" > Detalles </v-btn> 
                    
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-dialog v-model="modalCrear">
         <OrderForm v-if="modalCrear" v-on:guardar="cerrarAgregar"></OrderForm>
        </v-dialog>
        <v-dialog v-model="modalUpdate">
         <OrderFormUpdate v-if="modalUpdate" :item="Order" v-on:guardar="cerrarActualizar"></OrderFormUpdate>
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

        <v-dialog max-width="480" v-model="modalVer">
          <v-card> 
            <v-card-title>
                Detalles
            </v-card-title>
            <v-card-text v-if="order">
                Number of order : {{ order.order_number }} <br>
                Cliente :  {{ order.client.name }} {{ order.client.last_name }} <br>
               <h4>Productos </h4>
                <div v-if="order.order_detail.length >0">
                  <div v-for="(item, index) in order.order_detail"> 
                    {{ item.product.name }} <br> 
                  </div>
                </div>

            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="modalVer=false" > Aceptar </v-btn>
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
    name: 'IndexOrder',
    data () {
    return {
      busqueda: null,
      order : null,
      modalCrear : false,
      modalUpdate : false,
      modalDelete : false,
      modalVer :false, 
      datos: [], 
    }
  },
  mounted() {
      this.cargarOrder()
  },
  methods: {
    agregar () {
        this.modalCrear = true
    },
    cerrarAgregar () {
        this.modalCrear = false
        this.datos = [], 
        this.cargarOrder()
    },
    actualizar( client)
    {   this.client = client
        this.modalUpdate = true
    },
    ver( order)
    {   this.order = order
        this.modalVer = true
    },
    cerrarActualizar(){
        this.modalUpdate = false
        this.cargarOrder()
    },
    eliminar(client){
        this.modalDelete = true
        this.client = client
    },
    async confirmDelete(){
        this.modalDelete = false
        await this.deleteOrder(this.client)
        await this.cargarOrder()
    },
    async cargarOrder () {
      
        this.datos = await this.listarOrder()
    },
    ...mapActions({
      listarOrder: 'order/listar',
      deleteClients: 'client/eliminar' 
    }),
  }
  }
  </script>
  
<template>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            Clientes
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
                    Last name
                </th>
                <th class="text-left">
                    Email
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
                <td>{{ item.last_name }}</td>
                <td>{{ item.email }}</td>
                <td> 
                    <v-btn color="primary" @click="actualizar(item)" > Editar </v-btn>
                    <v-btn color="red" @click="eliminar(item)"> Eliminar </v-btn>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-dialog v-model="modalCrear">
         <ClientForm v-if="modalCrear" v-on:guardar="cerrarAgregar"></ClientForm>
        </v-dialog>
        <v-dialog v-model="modalUpdate">
         <ClientFormUpdate v-if="modalUpdate" :item="client" v-on:guardar="cerrarActualizar"></ClientFormUpdate>
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
      client : null,
      modalCrear : false,
      modalUpdate : false,
      modalDelete : false, 
      datos: [], 
    }
  },
  mounted() {
      this.cargarClients()
  },
  methods: {
    agregar () {
        this.modalCrear = true
    },
    cerrarAgregar () {
        this.modalCrear = false
        console.log('aqui')
        this.datos = [], 
        this.cargarClients()
        console.log('actualizo')
    },
    actualizar( client)
    {   this.client = client
        this.modalUpdate = true
    },
    cerrarActualizar(){
        this.modalUpdate = false
        this.cargarClients()
    },
    eliminar(client){
        this.modalDelete = true
        this.client = client
        //this.deleteClients(client)
        //this.cargarClients()
    },
    confirmDelete(){
        this.modalDelete = false
        this.deleteClients(this.client)
        this.cargarClients()
    },
    async cargarClients () {
      
        this.datos = await this.listarClients()
    },
    ...mapActions({
      listarClients: 'client/listar',
      deleteClients: 'client/eliminar' 
    }),
  }
  }
  </script>
  
<template>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            Supliers
            <v-spacer />
            <v-btn color="primary"> Agregar </v-btn>
          </v-card-title>
          <v-card-text>
            <v-simple-table>
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
            <tbody>
                <tr
                v-for="item in datos"
                :key="item.name"
                >
                <td>{{ item.name }}</td>
                <td>{{ item.last_name }}</td>
                <td>{{ item.email }}</td>
                <td> 
                    <v-btn color="primary"> Editar </v-btn>
                    <v-btn color="red"> Eliminar </v-btn>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
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
      datos: [], 
    }
  },
  async mounted() {
      this.buscarClients()
  },
  methods: {
    async buscarClients () {
      
        this.datos = await this.listarClients()
    },
    ...mapActions({
      listarClients: 'client/listar' 
    }),
  }
  }
  </script>
  
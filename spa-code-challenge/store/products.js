export const state = () => ({
    name: 'product',
    prefixUrl: '/api/clients',
    array: [],
    numPaginas: 0,
    total: 0,
    defaultValues: {
      id: null,
      nombre: null,
      last_name: null,
      email: null
    }
  })
  
  export const mutations = {
    // Control de un array para tenerlo en el storage
    setArray (state, data) {
      state.array = data
    },
    pushArray (state, data) {
      state.array.push(data)
    },
    deleteArray (state, index) {
      state.array.splice(index, 1)
    },
    replaceArray (state, data) {
      state.array.splice(data.index, 1, data.data)
    }
  }
  
  export const getters = {} // propiedades computadas del state
  
  export const actions = {
    async listar ({ commit, state }) {
      const response = await this.$axios.get(state.prefixUrl )
      commit('setArray', response.data)
      console.log(response)
      return response.data.datos
    }
  }
  
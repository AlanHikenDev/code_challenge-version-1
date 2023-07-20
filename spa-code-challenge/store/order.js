export const state = () => ({
    name: 'order',
    prefixUrl: '/api/order',
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
    },
    async guardar ({ commit, state }, payload) {
        const response = await this.$axios.post(state.prefixUrl, payload )
        console.log(response)
        return response
    },
    async actualizar ({ commit, state }, payload) {
        const response = await this.$axios.put(state.prefixUrl+'/'+payload.id, payload )
        commit('setArray', response.data)
        console.log(response)
        return response
    },
    async eliminar ({ commit, state }, payload) {
        const response = await this.$axios.delete(state.prefixUrl+'/'+payload.id  )
        commit('setArray', response.data)
        console.log(response)
        return response
    }, 
  }
  
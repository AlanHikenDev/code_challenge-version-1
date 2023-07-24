/* eslint no-console: "off" */
export const state = () => ({
  name: 'users',
  prefixUrl: '/api/users/',
  array: [],
  numPaginas: 0,
  total: 0,
  rol: null,
  defaultValues: {
    id: null,
    username: null,
    password: null,
    nombre: null,
    a_paterno: null,
    a_materno: null,
    activo: true,
    rol: null,
    created_at: null,
    updated_at: null,
    token: null
  }
})

export const mutations = {
  setRol (state, data) {
    state.rol = data
  },
  setArray (state, data) {
    state.array = data
  },
  setPaginar (state, data) {
    state.numPaginas = data.paginas
    state.total = data.count || data.array.length
    state.array = data.array
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
  
  async agregar ({ commit, state }, playload) {
    commit('app/SET_SPLASH', true, { root: true })
    const response = await this.$axios.post(state.prefixUrl + 'agregar', playload)
    commit('pushArray', response.data)
    commit('app/SET_SPLASH', false, { root: true })
    return { data: response.data, index: state.array.length - 1 }
  },
  async borrar ({ commit, state }, playload) { // playload = { id: 8, index: 7 }
    commit('app/SET_SPLASH', true, { root: true })
    const response = await this.$axios.post(state.prefixUrl + 'borrar', playload)
    commit('deleteArray', playload.index)
    commit('app/SET_SPLASH', false, { root: true })
    return response
  },
  async actualizar ({ commit, state }, playload) { // playload = { data:{...}, index: 7 }
    commit('app/SET_SPLASH', true, { root: true })
    const response = await this.$axios.post(state.prefixUrl + 'actualizar', playload.data)
    commit('replaceArray', { data: response.data, index: playload.index })
    commit('app/SET_SPLASH', false, { root: true })
    return response.data
  },
  async ver ({ commit, state }, playload) { // playload = { id: 8 }
    commit('app/SET_SPLASH', true, { root: true })
    const response = await this.$axios.post(state.prefixUrl + 'ver', playload)
    commit('app/SET_SPLASH', false, { root: true })
    return response.data
  },
  async buscar ({ commit, state }, playload) { // playload = { opciones: { campo1: 'val1', campo2: val2 }, paginar: { pagina: 1, limit: 30}, like: {} }
    commit('app/SET_SPLASH', true, { root: true })
    const response = await this.$axios.post(state.prefixUrl + 'buscar', playload)
    commit('setPaginar', response.data)
    commit('app/SET_SPLASH', false, { root: true })
    return response.data
  },
  async listar ({ commit, state }) {
    commit('app/SET_SPLASH', true, { root: true })
    const response = await this.$axios.get(state.prefixUrl + 'listar')
    commit('setArray', response.data)
    commit('app/SET_SPLASH', false, { root: true })
    return response.data
  }
}

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
  

}

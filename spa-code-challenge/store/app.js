/* eslint no-console: "off" */

export const state = () => ({
  name: 'CRUVI',
  version: '0.4.1',
  generalRules: {
    campoObligatorio: v => !!v || 'Campo obligatorio',
    soloNumeros: v => !isNaN(parseFloat(v)) || 'Solo numeros',
    numerosPositivos: v => v >= 0 || 'Debe ser mayor a cero',
    email: (v) => {
      const c = String(v).toLowerCase().match(/^\S+@\S+\.\S+$/)
      if (c && c.length > 0) {
        return true
      }
      return 'Ingresa un email valido'
    },
    password: (v) => {
      if (!v || v.length === 0) {
        return true
      }
      const car = String(v).toLowerCase().match(/^\S{8,16}$/)
      if (!car || car.length <= 0) {
        return 'Debe contener entre 8 y 16 caracteres'
      }
      if (!/[A-Z]/.test(v)) {
        return 'Debe contener al menos una letra Mayuscula'
      }
      if (!/\d/.test(v)) {
        return 'Debe contener al menos un Numero'
      }
      if (!/[$@!%*?&]/.test(v)) {
        return 'Debe contener al menos un Caracter especial($@!%*?&)'
      }
      return true
    }
  },
  items: [
    {
      icon: 'mdi-chart-bar',
      title: 'Metricas',
      to: '/dashboard', 
      rol: ['admin'],
      modulo: 'general'
    },
    {
      icon: 'mdi-clipboard-text',
      title: 'Inicio',
      to: '/', 
      rol: ['admin','produccion','inventario','consultas'],
      modulo: 'general'
    },
    {
      icon: 'mdi-clipboard-text',
      title: 'Admin. Pedidos',
      to: '/Pedidos', 
      rol: ['admin'],
      modulo: 'general'
    },
    {
      icon: 'mdi-account-group',
      title: 'Clientes',
      to: '/admin/clientes', 
      rol: ['admin'],
      modulo: 'general'
    },
    {
      icon: 'mdi-food-steak',
      title: 'Productos',
      to: '/admin/productos', 
      rol: ['admin'],
      modulo: 'almacen'
    },
    {
      icon: 'mdi-office-building-marker',
      title: 'Sucursales',
      to: '/admin/sucursales', 
      rol: ['admin'],
      modulo: 'general'
    },
    {
      icon: 'mdi-map-marker',
      title: 'Asentamientos',
      to: '/admin/asentamientos', 
      rol: ['admin'],
      modulo: 'general'
    },
    {
      icon: 'mdi-account',
      title: 'Usuarios',
      to: '/admin/usuarios', 
      rol: ['admin'],
      modulo: 'general'
    },
    {
      icon: 'mdi-file-excel',
      title: 'Reportes',
      to: '/admin/reportes', 
      rol: ['admin','inventario'],
      modulo: 'general'
    },
    {
      icon: 'mdi-clipboard-text',
      title: 'Admin. Agregar',
      to: '/inventario/agregar', 
      rol: ['admin','inventario'],
      modulo: 'compras'
    },
    {
      icon: 'mdi-clipboard-text',
      title: 'Admin. Index',
      to: '/inventario/Index', 
      rol: ['admin','inventario'],
      modulo: 'compras'
    },
    {
      icon: 'mdi-cellphone',
      title: 'Produccion',
      to: '/inventario/Produccion', 
      rol: ['admin','produccion'],
      modulo: 'inventario'
    },
    {
      icon: 'mdi-clipboard-text',
      title: 'Consultas',
      to: '/vistas/consulta', 
      rol: ['admin', 'consultas'],
      modulo: 'general'
    },
    {
      icon: 'mdi-clipboard-text',
      title: 'Almacen',
      to: '/inventario/Almacen', 
      rol: ['admin', 'consultas'],
      modulo: 'almacen'
    },
    {
      icon: 'mdi-clipboard-text',
      title: 'Listar Produccion',
      to: '/inventario/producidos', 
      rol: ['admin', 'consultas','produccion'],
      modulo: 'inventario'
    },
    {
      icon: 'mdi-cellphone',
      title: 'Alta',
      to: '/inventario/AltaProduccion', 
      rol: ['admin', 'consultas','produccion'],
      modulo: 'inventario'
    },
    {
      icon: 'mdi-cellphone',
      title: 'envios solicitud',
      to: '/inventario/Envios', 
      rol: ['admin','consultas','produccion'],
      modulo: 'envios'
    },
    {
      icon: 'mdi-cellphone',
      title: 'envios despacho',
      to: '/inventario/Despachar', 
      rol: ['admin','consultas','produccion'],
      modulo: 'envios'
    },
    {
      icon: 'mdi-cellphone',
      title: 'Lista envios',
      to: '/inventario/ListaEnvios', 
      rol: ['admin','consultas','produccion'],
      modulo: 'envios'
    },
    {
      icon: 'mdi-cellphone',
      title: 'Insumos',
      to: '/inventario/InsumosIndex', 
      rol: ['admin','consultas','inventario'],
      modulo: 'almacen'
    },
  ],
})

export const mutations = {
  SET_MINI (state, mini) {
    state.mini = mini
  },
  SET_DRAWER (state, drawer) {
    state.drawer = (drawer === true)
  },
  SET_ISLOG (state, isLogeado) {
    state.isLogeado = (isLogeado === true)
  },
  SET_SPLASH (state, value) {
    state.splash = value
  }
}

export const getters = {
  itemsPorRol (state, getters, rootState) {
    const datos = state.items.filter((item) => {
      return item.rol.includes(rootState.auth.user.rol)
    })
    const filteredData = datos.reduce((result, item) => {
      if (!result[item.modulo]) {
        result[item.modulo] = [];
      }
      result[item.modulo].push(item);
      return result;
    }, {});

    return filteredData
  },
  urlsPermitidas (state, getters) {
    const menus = getters.itemsPorRol;
    let todos = [] ;
    for (let clave in menus){
      const arregloSimple = menus[clave].map((item) => {
        return item.to
      })
      todos = todos.concat(arregloSimple)
    }
    return todos;
  }
}

export const actions = {
  copyClipboard (naa, playload) {
    console.log('el playload', playload)
    let c = document.createElement("textarea");
    c.value = playload.textToCopy;
    c.textContent = playload.textToCopy; 
    c.style.maxWidth = '0px';
    c.style.maxHeight = '0px';
    playload.item.appendChild(c);

    c.focus();        
    c.select();
    return new Promise((res, rej) => {
        if (document.execCommand('copy')) {
          playload.item.removeChild(c)
          res()
        } else {
          rej()
        }
        
    });
  },
  fechaHoy () {
    const d = new Date()
    const mes = d.getMonth() + 1
    return [d.getFullYear(), mes < 10 ? '0' + mes : mes , d.getDate()].join('-')
  }
}

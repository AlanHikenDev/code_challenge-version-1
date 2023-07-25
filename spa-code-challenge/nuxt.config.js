import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  //
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - spa-code-challenge',
    title: 'spa-code-challenge',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/api.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  router: {
		middleware: ['auth']
	},

  auth: {
    plugins: [
      { src: '~/plugins/axios', ssr: false },
      { src: '~/plugins/auth.js', ssr: false }
    ],
		redirect: {
			login: '/login',
      logout: '/login',
			home: '/',
			callback: false, // not used here in our case
		},
		strategies: {
			local: {
				endpoints: {
					login: { url: '/api/login', method: 'post' },
					logout: { url: '/api/logout', method: 'get' },
					user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
				},
				token: {
					property: 'token',
					global: true,
					required: true,
					type: 'Bearer'
				},
				refreshToken: {
					property: 'refresh_token',
					data: 'refresh_token',
					maxAge: 60 * 60 * 24 * 30
				},
				user: {
					property: 'user',
					autoFetch: true
				},
				autoLogout:true,
			}
		},
	},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    
  }
}

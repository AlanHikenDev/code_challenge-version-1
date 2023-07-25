<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    > {{ loggedIn }}
      <v-list>
        <v-list-item v-if="loggedIn"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item
        v-if="!loggedIn"
          to="/login"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >Login </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
        v-if="!loggedIn"
        to="/register"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >Register </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="loggedIn"
          @click="cerrarSesion"
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >Cerrar sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>



      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Clientes',
          to: '/general/clients'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Products',
          to: '/general/products'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Supliers',
          to: '/general/supliers'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Orders',
          to: '/general/orders'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Code challenge'
    }
  },
  mounted() {
    
  },
  computed: {
      loggedIn () {
        return this.$auth.loggedIn
      },
  },
  methods: {
    cerrarSesion () {
      this.$auth.logout().then(() => {})
    },
  }
}
</script>

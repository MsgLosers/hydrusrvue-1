<template>
  <nav
    id="navbar"
    class="navbar is-primary is-fixed-top"
    v-on-clickaway="closeNavigation">

    <div class="navbar-brand">

      <router-link to="/" exact class="navbar-item has-text-weight-bold">
        {{ title }}
      </router-link>

      <div
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': navigationIsOpen }"
        @click="toggleNavigation(!navigationIsOpen)"
        v-if="isInitialized && !error.isFatal">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>

    <div
      class="navbar-menu"
      :class="{ 'is-active': navigationIsOpen }"
      v-if="isInitialized && !error.isFatal">

      <div
        class="navbar-start"
        v-if="isAuthorized || !authenticationIsRequired">
        <router-link
          to="/files"
          class="navbar-item"
          event=""
          @click.native.prevent="navigateOrScrollToTop('/files')">
          Files
        </router-link>
        <router-link
          to="/tags"
          class="navbar-item"
          event=""
          @click.native.prevent="navigateOrScrollToTop('/tags')">
          Tags
        </router-link>
      </div>

      <div class="navbar-end">

        <router-link
          to="/help"
          class="navbar-item"
          v-if="isAuthorized || !authenticationIsRequired">
          <span class="icon">
            <font-awesome-icon icon="info" />
          </span>
          <span>Help</span>
        </router-link>

        <router-link
          to="/settings"
          class="navbar-item"
          v-if="isAuthorized || !authenticationIsRequired">
          <span class="icon">
            <font-awesome-icon icon="cog" />
          </span>
          <span>Settings</span>
        </router-link>

        <router-link to="/user" class="navbar-item" v-if="isAuthorized">
          <span class="icon">
            <font-awesome-icon icon="user" />
          </span>
          <span>User</span>
        </router-link>

        <router-link to="/logout" class="navbar-item" v-if="isAuthorized">
          <span class="icon">
            <font-awesome-icon icon="sign-out-alt" />
          </span>
          <span>Log out</span>
        </router-link>

        <router-link to="/login" class="navbar-item" v-if="!isAuthorized">
          <span class="icon">
            <font-awesome-icon icon="sign-in-alt" />
          </span>
          <span>Login</span>
        </router-link>

        <router-link
          to="/registration"
          class="navbar-item"
          v-if="!isAuthorized && registrationIsEnabled">
          <span class="icon">
            <font-awesome-icon icon="user-plus" />
          </span>
          <span>Registration</span>
        </router-link>

      </div>

    </div>

  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import config from '@/config'

export default {
  name: 'Navbar',
  mixins: [clickaway],
  props: {
    isInitialized: {
      type: Boolean,
      required: true
    },
    isAuthorized: {
      type: Boolean,
      required: true
    },
    authenticationIsRequired: {
      type: Boolean,
      required: true
    },
    error: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      title: config.title,
      registrationIsEnabled: config.registrationIsEnabled
    }
  },
  computed: {
    ...mapState({
      navigationIsOpen: state => state.app.navigationIsOpen
    })
  },
  methods: {
    toggleNavigation: function (open) {
      if (open) {
        this.openNavigation()

        return
      }

      this.closeNavigation()
    },
    navigateOrScrollToTop: function (route) {
      if (route === this.$route.path) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })

        if (this.navigationIsOpen) {
          this.closeNavigation()
        }

        return
      }

      this.$router.push(route)
    },
    ...mapActions({
      openNavigation: 'app/openNavigation',
      closeNavigation: 'app/closeNavigation'
    })
  },
  components: {
    FontAwesomeIcon
  }
}
</script>

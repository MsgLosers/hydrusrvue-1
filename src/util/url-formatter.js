import config from '@/config'
import store from '@/store'

export default {
  prepareMediaUrl (url) {
    return config.authenticationIsRequired
      ? url + store.getters['auth/mediaTokenQueryString']
      : url
  }
}

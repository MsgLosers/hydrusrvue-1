<template>
  <div class="wrapper">

    <vue-headful :title="title" />

    <section class="section">
      <div class="container">
        <h1 class="title has-text-primary has-text-centered">{{ title }}</h1>
        <h2
          class="subtitle has-text-centered"
          v-if="subtitle"
          v-html="subtitle"></h2>
        <search v-if="isAuthorized  || !authenticationIsRequired" />
      </div>
    </section>

    <section class="section">

      <div class="container">

        <div class="content has-text-centered">

          <p v-if="isAuthorized || !authenticationIsRequired">
            <strong>{{ api.fileCount | formatNumber }}</strong> files
            |
            <strong>{{ api.tagCount | formatNumber }}</strong> tags
          </p>

          <p>
            <span>Running <code>{{ version }}</code></span>
            <br>
            <span v-if="api.isAvailable">
              Connected to <code>{{ api.version }}</code>
            </span>
          </p>

        </div>

      </div>

    </section>

  </div>
</template>

<script>
import { mapState } from 'vuex'

import config from '@/config'

import Search from '@/components/home/Search'

export default {
  name: 'Home',
  props: {
    isAuthorized: {
      type: Boolean,
      required: true
    },
    authenticationIsRequired: {
      type: Boolean,
      required: true
    }
  },
  data: function () {
    return {
      version: `hydrusrvue@${config.version}`,
      title: config.title,
      subtitle: config.subtitle
    }
  },
  computed: {
    ...mapState({
      api: state => state.api
    })
  },
  components: {
    Search
  }
}
</script>

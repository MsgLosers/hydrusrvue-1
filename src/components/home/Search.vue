<template>
  <form @submit.prevent="handleSubmit">

    <div class="columns">

      <div class="column is-9">
        <div class="field">
          <div class="control">
            <search-input
              :search.sync="search"
              :hasCompletedSearch.sync="hasCompletedSearch"
              size="is-medium"
              :placeholder="
                'Search for files by tag or constraint…' |
                  formatToConfiguredLetterCase
              " />
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="field">
          <div class="control">
            <button
              type="submit"
              class="button is-primary is-medium is-fullwidth"
              :class="{ 'is-lowercase': !useNormalLetterCase }">
              <span class="icon">
                <font-awesome-icon icon="search" />
              </span>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

    </div>

  </form>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import config from '@/config'
import api from '@/api'
import queryFormatter from '@/util/query-formatter'

import SearchInput from '@/components/general/SearchInput'

export default {
  name: 'Search',
  data: function () {
    return {
      search: '',
      hasCompletedSearch: false,
      useNormalLetterCase: config.useNormalLetterCase
    }
  },
  methods: {
    handleSubmit: function () {
      api.cancelPendingTagAutocompleteRequest()

      this.$router.push({
        path: '/files',
        query: queryFormatter.generateDefaultFilesQuery(
          this.search.trim().toLowerCase()
        )
      })
    }
  },
  watch: {
    hasCompletedSearch: function (hasCompletedSearch) {
      if (hasCompletedSearch) {
        this.handleSubmit()
      }
    }
  },
  components: {
    FontAwesomeIcon,
    SearchInput
  }
}
</script>

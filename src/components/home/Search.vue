<template>
  <form @submit.prevent="handleSubmit">

    <div class="columns">

      <div class="column is-9">
        <div class="field">
          <div class="control">
            <tag-input
              :tag.sync="tag"
              :hasCompletedTag.sync="hasCompletedTag"
              size="is-medium"
              placeholder="search for files by tag…" />
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="field">
          <div class="control">
            <button
              type="submit"
              class="button is-primary is-medium is-fullwidth">
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

import api from '@/api'
import queryFormatter from '@/util/query-formatter'

import TagInput from '@/components/general/TagInput'

export default {
  name: 'Search',
  data: function () {
    return {
      tag: '',
      hasCompletedTag: false
    }
  },
  methods: {
    handleSubmit: function () {
      api.cancelPendingTagAutocompleteRequest()

      this.$router.push({
        path: '/files',
        query: queryFormatter.generateDefaultFilesQuery(
          this.tag.trim().toLowerCase()
        )
      })
    }
  },
  watch: {
    hasCompletedTag: function (hasCompletedTag) {
      if (hasCompletedTag) {
        this.handleSubmit()
      }
    }
  },
  components: {
    FontAwesomeIcon,
    TagInput
  }
}
</script>

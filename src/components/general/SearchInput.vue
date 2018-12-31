<template>
  <div v-on-clickaway="stopCompleting">

    <input
      type="text"
      class="input"
      :class="size"
      ref="search"
      :placeholder="placeholder"
      @keydown.tab.prevent="focusActiveFilters"
      @keyup="tryCompletion"
      @click="tryCompletion"
      @focus="tryCompletion"
      @keydown.down.prevent="focusSuggestion(0)"
      v-model="localSearch"
      v-focus>

    <div
      class="suggestions dropdown"
      :class="{ 'is-active': suggestions.length }"
      v-if="suggestions.length">
      <div class="dropdown-menu">
        <div class="dropdown-content">
          <a
            class="dropdown-item"
            :class="{ 'constraint': suggestion.type === 'constraint' }"
            href="#"
            ref="suggestions"
            :style="{ color: suggestion.color }"
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @keydown.up.prevent="focusSuggestion(index - 1)"
            @keydown.down.prevent="focusSuggestion(index + 1)"
            @keydown.tab.prevent="focusSuggestion(index)"
            @keydown.escape.prevent="focusSuggestion(-1)"
            @click.prevent="
              completePartialSearch(suggestion.name, suggestion.type)
            "
            @keydown.enter.prevent="
              completePartialSearch(suggestion.name, suggestion.type)
            ">
            <span class="icon" v-if="suggestion.type === 'constraint'">
              <font-awesome-icon icon="tools" />
            </span>
            <span>{{ suggestion.name }}</span>
            <small class="file-amount" v-if="suggestion.type === 'tag'">
              {{ suggestion.fileCount | formatNumber }}
            </small>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'
import axios from 'axios'
import debounce from 'lodash/debounce'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import api from '@/api'
import errorHandler from '@/util/error-handler'
import tagsHelper from '@/util/tags-helper'

export default {
  name: 'SearchInput',
  mixins: [clickaway],
  props: {
    search: {
      type: String,
      required: true
    },
    hasCompletedSearch: {
      type: Boolean,
      required: true
    },
    size: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: true
    },
    parentRefs: {
      type: Object,
      required: false
    }
  },
  data: function () {
    return {
      isSearching: false,
      suggestions: []
    }
  },
  computed: {
    localSearch: {
      get: function () {
        return this.search
      },
      set: function (localSearch) {
        this.$emit('update:search', localSearch)
      }
    },
    localHasCompletedSearch: {
      get: function () {
        return this.hasCompletedSearch
      },
      set: function (localHasCompletedSearch) {
        this.$emit('update:hasCompletedSearch', localHasCompletedSearch)
      }
    },
    ...mapState({
      colors: state => state.settings.colors,
      mimeTypes: state => state.files.mimeTypes,
      token: state => state.auth.token
    })
  },
  methods: {
    tryCompletion: function () {
      api.cancelPendingTagAutocompleteRequest()

      this.isSearching = true

      if (['', '-'].includes(this.localSearch.trim())) {
        this.isSearching = false
        this.suggestions = []

        return
      }

      this.fetchSuggestions(this.localSearch)
    },
    fetchSuggestions: function (partialSearch) {
      partialSearch = partialSearch.trim().toLowerCase()

      const body = {
        partialTag: partialSearch.startsWith('-')
          ? partialSearch.substr(1)
          : partialSearch
      }

      api.autocompleteTag(body, this.token)
        .then(res => {
          if (this.search === '') {
            return
          }

          for (const suggestion of res.data.tags) {
            suggestion.type = 'tag'
            suggestion.color = tagsHelper.getColor(
              suggestion.name, this.colors
            )
          }

          this.suggestions = this.getConstraintSuggestions(partialSearch)
            .concat(res.data.tags)
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            return
          }

          errorHandler.handle(
            err.response,
            [
              { name: 'MissingTokenError', isFatal: false, isLocal: false },
              { name: 'InvalidTokenError', isFatal: false, isLocal: false },
              {
                name: 'MissingPartialTagFieldError',
                isFatal: false,
                isLocal: false
              },
              {
                name: 'InvalidPartialTagFieldError',
                isFatal: false,
                isLocal: false
              },
              { name: 'ShuttingDownError', isFatal: true, isLocal: false },
              { name: 'InternalServerError', isFatal: true, isLocal: false }
            ]
          )
        })

      this.isSearching = false
    },
    getConstraintSuggestions: function (partialConstraint) {
      const suggestions = []

      const potentialCompletions = [
        [
          ['id'],
          ['id=', 'id!=', 'id~=', 'id>', 'id<', 'id><']
        ],
        [
          ['hash'],
          ['hash=', 'hash!=']
        ],
        [
          ['size'],
          ['size=', 'size!=', 'size~=', 'size>', 'size<', 'size><']
        ],
        [
          ['width'],
          ['width=', 'width!=', 'width~=', 'width>', 'width<', 'width><']
        ],
        [
          ['height'],
          ['height=', 'height!=', 'height~=', 'height>', 'height<', 'height><']
        ],
        [
          ['mime'],
          ['mime=', 'mime!='],
          [
            ...this.mimeTypes.map(mime => `mime=${mime.name}`),
            ...this.mimeTypes.map(mime => `mime!=${mime.name}`)
          ]
        ],
        [
          ['tags'],
          ['tags=', 'tags!=', 'tags~=', 'tags>', 'tags<', 'tags><']
        ]
      ]

      for (const group of potentialCompletions) {
        let foundSuggestions = false

        for (const step of group) {
          if (foundSuggestions) {
            break
          }

          for (const completion of step) {
            if (
              completion.startsWith(partialConstraint) &&
              completion !== partialConstraint
            ) {
              suggestions.push({
                type: 'constraint',
                name: completion
              })

              foundSuggestions = true
            }
          }
        }
      }

      return suggestions
    },
    completePartialSearch: function (suggestion, type) {
      if (type === 'constraint') {
        if (suggestion.includes('=') && suggestion.split('=')[1].length) {
          this.localSearch = suggestion

          this.localHasCompletedSearch = true
        } else {
          this.localSearch = suggestion
        }
      } else {
        this.localSearch = this.localSearch.startsWith('-')
          ? `-${suggestion}`
          : suggestion

        this.localHasCompletedSearch = true
      }

      this.suggestions = []

      this.$nextTick(() => {
        this.$refs.search.focus()
      })
    },
    stopCompleting: function () {
      this.suggestions = []
    },
    focusActiveFilters: function () {
      if (
        this.parentRefs &&
        this.parentRefs.activeFilters &&
        this.parentRefs.activeFilters.length
      ) {
        this.stopCompleting()

        this.parentRefs.activeFilters[this.parentRefs.activeFilters.length - 1]
          .focus()
      }
    },
    focusSuggestion: function (index) {
      this.$nextTick(() => {
        if (this.suggestions.length) {
          if (index === -1) {
            this.$refs.search.focus()

            return
          }

          if (index >= this.suggestions.length) {
            return
          }

          this.$refs.suggestions[index].focus()
        }
      })
    }
  },
  created: function () {
    this.debouncedCompletion = debounce(function () {
      this.tryCompletion()
    }, 50)
  },
  components: {
    FontAwesomeIcon
  }
}
</script>

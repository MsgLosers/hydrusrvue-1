<template>
  <div v-on-clickaway="stopCompleting">

    <input
      type="text"
      class="input"
      :class="size"
      ref="tag"
      :placeholder="placeholder"
      @keydown.tab.prevent="focusActiveTags"
      @keyup="tryCompletion"
      @click="tryCompletion"
      @keydown.down.prevent="focusSuggestion(0)"
      v-model="localTag"
      v-focus>

    <div
      class="suggestions dropdown"
      :class="{ 'is-active': !isSearching && suggestions.length }"
      v-if="!isSearching && suggestions.length">
      <div class="dropdown-menu">
        <div class="dropdown-content">
          <a
            class="dropdown-item"
            href="#"
            ref="suggestions"
            :style="{ color: suggestion.color }"
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @keydown.up.prevent="focusSuggestion(index - 1)"
            @keydown.down.prevent="focusSuggestion(index + 1)"
            @keydown.tab.prevent="focusSuggestion(index)"
            @keydown.escape.prevent="focusSuggestion(-1)"
            @click.prevent="completePartialTag(suggestion.name)"
            @keydown.enter.prevent="completePartialTag(suggestion.name)">
            {{ suggestion.name }}
            <small class="file-amount">
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
import debounce from 'lodash/debounce'

import api from '@/api'
import errorHandler from '@/util/error-handler'
import tagFormatter from '@/util/tag-formatter'

export default {
  name: 'TagInput',
  mixins: [clickaway],
  props: {
    tag: {
      type: String,
      required: true
    },
    hasCompletedTag: {
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
    localTag: {
      get: function () {
        return this.tag
      },
      set: function (localTag) {
        this.$emit('update:tag', localTag)
      }
    },
    localHasCompletedTag: {
      get: function () {
        return this.hasCompletedTag
      },
      set: function (localHasCompletedTag) {
        this.$emit('update:hasCompletedTag', localHasCompletedTag)
      }
    },
    ...mapState({
      colors: state => state.settings.colors,
      token: state => state.auth.token
    })
  },
  methods: {
    tryCompletion: function () {
      this.isSearching = true

      if (['', '-'].includes(this.localTag.trim())) {
        this.isSearching = false
        this.suggestions = []

        return
      }

      this.fetchSuggestions(
        this.localTag.startsWith('-') ? this.localTag.substr(1) : this.localTag
      )
    },
    fetchSuggestions: function (partialTag) {
      this.suggestions = []

      const body = {
        partialTag: partialTag.trim().toLowerCase()
      }

      api.autocompleteTag(body, this.token)
        .then(res => {
          for (const suggestion of res.data.tags) {
            suggestion.color = tagFormatter.getColor(
              suggestion.name, this.colors
            )
          }

          this.suggestions = res.data.tags
        })
        .catch(err => {
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
    completePartialTag: function (suggestion) {
      this.localTag = this.localTag.startsWith('-')
        ? `-${suggestion}`
        : suggestion
      this.localHasCompletedTag = true
      this.suggestions = []

      this.$refs.tag.focus()
    },
    stopCompleting: function () {
      this.suggestions = []
    },
    focusActiveTags: function () {
      if (
        this.parentRefs &&
        this.parentRefs.activeTags &&
        this.parentRefs.activeTags.length
      ) {
        this.stopCompleting()

        this.parentRefs.activeTags[this.parentRefs.activeTags.length - 1]
          .focus()
      }
    },
    focusSuggestion: function (index) {
      this.$nextTick(() => {
        if (this.suggestions.length) {
          if (index === -1) {
            this.$refs.tag.focus()

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
  }
}
</script>

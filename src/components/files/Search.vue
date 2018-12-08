<template>
  <form @submit.prevent="handleSubmit">

    <div class="columns">

      <div class="column is-5-tablet is-6-desktop">

        <div class="field has-addons" v-if="totalCount">
          <div class="control is-expanded">
            <tag-input
              ref="tagInput"
              :tag.sync="tag"
              :hasCompletedTag.sync="hasCompletedTag"
              :placeholder="placeholderText"
              :parentRefs="$refs" />
          </div>
          <div class="control">
            <a class="button is-static">{{ totalCount }}</a>
          </div>
        </div>

        <div class="field" v-else>
          <div class="control">
            <tag-input
              ref="tagInput"
              :tag.sync="tag"
              :hasCompletedTag.sync="hasCompletedTag"
              :placeholder="placeholderText"
              :parentRefs="$refs" />
          </div>
        </div>

      </div>

      <div class="column is-5-tablet is-4-desktop">
        <sorting
          :sorting.sync="sorting"
          :sortingDirection.sync="sortingDirection"
          :sortingNamespaces.sync="sortingNamespaces" />
      </div>

      <div class="column is-2">
        <div class="field">
          <div class="control">
            <button type="submit" class="button is-primary is-fullwidth">
              <span class="icon">
                <font-awesome-icon icon="search" />
              </span>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

    </div>

    <div class="file-tags tags" v-if="activeTags.length">
      <a
        class="tag is-medium"
        href="#"
        ref="activeTags"
        :style="{ backgroundColor: tag.color }"
        v-for="(tag, index) in activeTags"
        :key="index"
        @click.prevent="removeTag(tag.name, true)"
        @keydown.enter.prevent="removeTag(tag.name, true)"
        @keydown.delete.prevent="removeTag(tag.name, true)"
        @keydown.left.prevent="focusActiveTag(index - 1)"
        @keydown.right.prevent="focusActiveTag(index + 1)"
        @keydown.tab.prevent="focusActiveTag(activeTags.length - 1)"
        @keydown.shift.tab.prevent="focusActiveTag(0)"
        @keydown.esc.prevent="focusTagInput"
        @keydown.prevent="startTyping">
        <span class="icon" v-if="tag.exclude">
          <font-awesome-icon icon="eye-slash" />
        </span>
        <span>{{ tag.name }}</span>
        <span type="button" class="delete is-small"></span>
      </a>
    </div>

  </form>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { isEmpty } from 'lodash/lang'
import qs from 'qs'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import config from '@/config'
import queryFormatter from '@/util/query-formatter'
import tagFormatter from '@/util/tag-formatter'

import TagInput from '@/components/general/TagInput'
import Sorting from '@/components/files/Sorting'

export default {
  name: 'Search',
  props: {
    isLoading: {
      type: Boolean,
      required: true
    },
    lastQuery: {
      required: true
    },
    wantsAdditionalFiles: {
      type: Boolean,
      required: true
    }
  },
  data: function () {
    return {
      isInitialized: false,
      tag: '',
      sorting: this.$store.state.settings.filesSorting,
      sortingDirection: this.$store.state.settings.filesSortingDirection,
      sortingNamespaces: Object.assign(
        [], this.$store.state.settings.filesSortingNamespaces
      ),
      page: 1,
      activeTags: [],
      hasCompletedTag: false
    }
  },
  computed: {
    placeholderText: function () {
      return this.activeTags.length
        ? 'add more tags to your search…'
        : 'search for files by tag…'
    },
    ...mapState({
      totalCount: state => state.files.totalCount,
      hasReachedLastPage: state => state.files.hasReachedLastPage,
      colors: state => state.settings.colors
    }),
    ...mapGetters({
      countIsConfirmed: 'files/countIsConfirmed'
    })
  },
  methods: {
    initialize: function () {
      if (!isEmpty(this.$route.query)) {
        this.page = queryFormatter.ensureValidPage(this.$route.query.page)

        if (this.$route.query.tags) {
          this.setTags(this.$route.query.tags)
        }

        if (
          ['id', 'size', 'width', 'height', 'mime', 'random', 'namespaces']
            .includes(
              this.$route.query.sort
            )
        ) {
          this.sorting = this.$route.query.sort

          if (this.$route.query.sort === 'namespaces') {
            if (this.$route.query.namespaces) {
              this.sortingNamespaces = this.$route.query.namespaces
            } else {
              this.sorting = 'id'
            }
          }
        }

        if (['default', 'asc', 'desc'].includes(this.$route.query.direction)) {
          this.sortingDirection = this.$route.query.direction
        }

        const queryString = qs.stringify(
          this.$route.query,
          { addQueryPrefix: true }
        )

        if (queryString !== this.lastQuery) {
          this.setLastQuery(queryString)

          this.loadFiles(false)
        }

        this.finishInitialization()

        return
      }

      this.emptyFiles()
      this.unsetLastQuery()

      this.loadFiles(false)

      this.finishInitialization()
    },
    handleSubmit: function () {
      this.page = 1

      this.loadFiles(false)
    },
    updateQueryAndGetStrings: function () {
      const query = queryFormatter.generateFilesQuery(
        this.activeTags.map(
          tag => tag.exclude ? `-${tag.name}` : tag.name
        ),
        this.sorting,
        this.sortingDirection,
        this.sortingNamespaces,
        this.page
      )

      const sanitizedQuery = Object.assign({}, query)

      if (sanitizedQuery.direction && sanitizedQuery.direction === 'default') {
        delete sanitizedQuery.direction
      }

      this.$router.replace({
        path: '/files',
        query: query
      })

      return {
        queryString: qs.stringify(query, { addQueryPrefix: true }),
        sanitizedQueryString: qs.stringify(
          sanitizedQuery, { addQueryPrefix: true }
        )
      }
    },
    loadFiles: function (fetchNextPage) {
      this.tag = this.tag.trim().toLowerCase()

      if (this.tag !== '') {
        this.removeTag(
          this.tag.startsWith('-') ? this.tag.substr(1) : this.tag
        )

        this.addTag(this.tag)
      }

      this.tag = ''

      const queryStrings = this.updateQueryAndGetStrings()

      this.setLastQuery(queryStrings.queryString)

      if (fetchNextPage) {
        this.fetchNextPage(queryStrings.sanitizedQueryString)

        return
      }

      this.fetchFiles(queryStrings.sanitizedQueryString)
    },
    addTag: function (tag) {
      this.activeTags.push({
        name: tag.startsWith('-')
          ? tag.replace('-', '')
          : tag.startsWith('\\-')
            ? tag.replace('\\-', '-')
            : tag,
        exclude: tag.startsWith('-'),
        color: tagFormatter.getColor(
          tag.startsWith('-')
            ? tag.replace('-', '')
            : tag.startsWith('\\-')
              ? tag.replace('\\-', '')
              : tag,
          this.colors
        )
      })
    },
    setTags: function (tags) {
      this.activeTags = []

      if (tags.length) {
        tags = tags
          .map(tag => tag.trim())
          .filter(tag => tag.length)
          .filter((tag, i, tags) => tags.indexOf(tag) === i)

        for (const tag of tags) {
          this.addTag(tag)
        }
      }
    },
    removeTag: function (tag, submit = false) {
      for (let i = 0; i < this.activeTags.length; i++) {
        if (this.activeTags[i].name === tag) {
          this.activeTags.splice(i, 1)
        }
      }

      if (submit) {
        this.handleSubmit()

        this.$nextTick(() => {
          if (this.activeTags.length) {
            this.$refs.activeTags[this.$refs.activeTags.length - 1].focus()

            return
          }

          this.focusTagInput()
        })
      }
    },
    finishInitialization: function () {
      /*
       * workaround to delay sorting watchers to not reset page to 1 after
       * loading the view
       * see https://github.com/vuejs/vue/issues/2918#issuecomment-408669914
       */
      setTimeout(() => {
        this.isInitialized = true
      }, 0)
    },
    focusActiveTag: function (index) {
      this.$nextTick(() => {
        if (this.activeTags.length) {
          if (index === -1) {
            this.$refs.activeTags[this.$refs.activeTags.length - 1].focus()

            return
          }

          if (index >= this.activeTags.length) {
            this.$refs.activeTags[0].focus()

            return
          }

          this.$refs.activeTags[index].focus()
        }
      })
    },
    focusTagInput: function () {
      this.$refs.tagInput.$refs.tag.focus()
    },
    startTyping: function (event) {
      if (event.key.match(/^[ -~]$/g)) {
        this.focusTagInput()

        this.tag = this.tag + event.key.toLowerCase()
      }
    },
    ...mapActions({
      fetchFiles: 'files/fetch',
      fetchNextPage: 'files/fetchNextPage',
      emptyFiles: 'files/empty',
      setLastQuery: 'files/setLastQuery',
      unsetLastQuery: 'files/unsetLastQuery'
    })
  },
  watch: {
    sorting: function () {
      if (!this.isInitialized) {
        return
      }

      this.handleSubmit()
    },
    sortingDirection: function () {
      if (!this.isInitialized) {
        return
      }

      this.handleSubmit()
    },
    sortingNamespaces: function () {
      if (!this.isInitialized) {
        return
      }

      this.handleSubmit()
    },
    wantsAdditionalFiles: function (wantsAdditionalFiles) {
      if (
        !isEmpty(this.$route.query) &&
        wantsAdditionalFiles &&
        !this.isLoading &&
        !this.hasReachedLastPage
      ) {
        this.page++

        this.loadFiles(true)
      }
    },
    hasReachedLastPage: function (hasReachedLastPage) {
      if (hasReachedLastPage) {
        if (!(config.countsAreEnabled && this.countIsConfirmed)) {
          this.page = (this.page - 1) > 0 ? this.page - 1 : 1
        }

        this.setLastQuery(this.updateQueryAndGetStrings().queryString)
      }
    },
    hasCompletedTag: function (hasCompletedTag) {
      if (hasCompletedTag) {
        this.hasCompletedTag = false

        this.handleSubmit()
      }
    }
  },
  mounted: function () {
    this.initialize()
  },
  components: {
    FontAwesomeIcon,
    TagInput,
    Sorting
  }
}
</script>

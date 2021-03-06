import constraintsHelper from '@/util/constraints-helper'
import store from '@/store'

export default {
  ensureValidPage (page) {
    const validPage = page && !isNaN(page) && page > 1 && page <= 999999999
      ? parseInt(page, 10)
      : 1

    return validPage > 0 ? validPage : 1
  },
  generateFilesQuery (tags, constraints, sort, direction, namespaces, page) {
    return {
      tags: tags.length
        ? tags
          .map(tag => tag.trim())
          .filter(tag => tag.length)
          .filter((tag, index, tags) => tags.indexOf(tag) === index)
        : [],
      constraints: constraints.length
        ? constraints
          .map(constraint => constraint.trim())
          .filter(constraint => constraint.length)
          .filter(
            (constraint, index, constraints) => constraints.indexOf(
              constraint
            ) === index
          )
        : [],
      sort: sort || undefined,
      direction: direction || undefined,
      namespaces: sort === 'namespaces' && namespaces.length
        ? namespaces
        : undefined,
      page: page
    }
  },
  generateDefaultFilesQuery (search) {
    const isSearchConstraint = constraintsHelper.isValidConstraint(search)

    return this.generateFilesQuery(
      !isSearchConstraint ? [search] : [],
      isSearchConstraint ? [search] : [],
      store.state.settings.filesSorting,
      store.state.settings.filesSortingDirection,
      store.state.settings.filesSortingNamespaces,
      1
    )
  },
  generateTagsQuery (contains, sort, direction, page) {
    return {
      contains: contains !== '' ? contains : undefined,
      sort: sort || undefined,
      direction: direction || undefined,
      page: page
    }
  }
}

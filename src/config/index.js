const generateNamespaceColors = environmentVariable => {
  const colors = [{
    name: 'unnamespaced',
    color: process.env.VUE_APP_FALLBACK_TAG_COLOR || '#0088fb'
  }]

  for (const color of environmentVariable.split('|')) {
    const splitColor = color.split('#').map(property => property.trim())

    if (splitColor[0] === '' || !/^#[0-9a-f]{6}$/i.test(`#${splitColor[1]}`)) {
      continue
    }

    colors.push({
      name: splitColor[0],
      color: `#${splitColor[1]}`
    })
  }

  return colors
}

export default {
  title: process.env.VUE_APP_TITLE,
  version: '1.13.0',
  apiUrl: process.env.VUE_APP_API_URL,
  registrationIsEnabled: (process.env.VUE_APP_REGISTRATION_ENABLED === 'true'),
  authenticationIsRequired: process.env.VUE_APP_AUTHENTICATION_REQUIRED
    ? (process.env.VUE_APP_AUTHENTICATION_REQUIRED === 'true')
    : true,
  minPasswordLength: process.env.VUE_APP_MIN_PASSWORD_LENGTH || 16,
  fallbackFilesSortingNamespace:
    process.env.VUE_APP_FALLBACK_FILES_SORTING_NAMESPACE || 'namespace',
  defaultNamespaceColors: generateNamespaceColors(
    process.env.VUE_APP_DEFAULT_NAMESPACE_COLORS
  ),
  fallbackTagColor: process.env.VUE_APP_FALLBACK_TAG_COLOR || '#0088fb'
}

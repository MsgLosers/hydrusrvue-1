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
  version: '3.0.2',
  title: process.env.VUE_APP_TITLE,
  subtitle: process.env.VUE_APP_SUBTITLE,
  useNormalLetterCase: process.env.VUE_APP_USE_NORMAL_LETTER_CASE === 'true',
  apiUrl: process.env.VUE_APP_API_URL,
  registrationIsEnabled: process.env.VUE_APP_REGISTRATION_ENABLED === 'true',
  authenticationIsRequired: process.env.VUE_APP_AUTHENTICATION_REQUIRED
    ? process.env.VUE_APP_AUTHENTICATION_REQUIRED === 'true'
    : true,
  minPasswordLength: process.env.VUE_APP_MIN_PASSWORD_LENGTH || 16,
  countsAreEnabled: process.env.VUE_APP_COUNTS_ENABLED === 'true',
  fallbackFilesSortingNamespace:
    process.env.VUE_APP_FALLBACK_FILES_SORTING_NAMESPACE || 'namespace',
  defaultNamespaceColors: generateNamespaceColors(
    process.env.VUE_APP_DEFAULT_NAMESPACE_COLORS
  ),
  fallbackTagColor: process.env.VUE_APP_FALLBACK_TAG_COLOR || '#0088fb',
  mimeTypes: {
    1: 'image/jpeg',
    2: 'image/png',
    3: 'image/gif',
    4: 'image/bmp',
    9: 'video/x-flv',
    14: 'video/mp4',
    18: 'video/x-ms-wmv',
    20: 'video/x-matroska',
    21: 'video/webm',
    23: 'image/apng',
    25: 'video/mpeg',
    26: 'video/quicktime',
    27: 'video/x-msvideo'
  }
}

<h1>
  <img
    src="https://github.com/mserajnik/hydrusrvue/raw/master/media/logo.png"
    alt="hydrusrvue logo"
    width="128">
  <br>
  hydrusrvue
  <a href="https://travis-ci.com/mserajnik/hydrusrvue">
    <img src="https://travis-ci.com/mserajnik/hydrusrvue.svg" alt="Build status">
  </a>
  <a href="https://snyk.io/test/github/mserajnik/hydrusrvue">
    <img
      src="https://snyk.io/test/github/mserajnik/hydrusrvue/badge.svg"
      alt="Known vulnerabilities">
  </a>
  <a href="https://standardjs.com">
    <img
      src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"
      alt="JavaScript Standard Style">
  </a>
</h1>

> A Vue-based frontend for [hydrusrv][hydrusrv]

__Adandoned: hydrusrvue is no longer maintained.__

hydrusrvue is a [Vue][vue]-based frontend for [hydrusrv][hydrusrv] that makes
use of its entire feature set, allowing you to access your media managed with
[hydrus server][hydrus-server] on the web. It is largely built with
[Bulma][bulma] and optimized for all common desktop and mobile screen sizes.

The most prominent features are:

+ Comprehensive options to search and sort your files and tags
+ A gallery mode in the files search page that allows you to comfortably view
  your files in a lightbox without navigating to the detail page
+ Direct support for common image and video formats on the web; non-supported
  files can be downloaded and viewed locally
+ Built-in user registration and actions like changing username or password or
  deleting the user altogether
+ The ability to define options like tag colors and default sorting methods on
  a per-client basis, allowing you to have different settings in each browser
+ Fast delivery due to [lazy loading routes][lazy-loading-routes]
+ Enhanced performance on modern browsers thanks to [Vue CLI][vue-cli]'s
  [modern mode][modern-mode]
+ Basic web app features that allow you to add hydrusrvue to the home screen of
  your smart device and use it just like a native app
+ Experimental [Electron][electron] support that allows you to built a
  hydrusrvue desktop app for any major platform

## Table of contents

+ [Install](#install)
  + [Dependencies](#dependencies)
  + [Updating](#updating)
    + [Upgrading from 4.x to 5.x](#upgrading-from-4x-to-5x)
    + [Upgrading from 3.x to 4.x](#upgrading-from-3x-to-4x)
    + [Upgrading from 2.x to 3.x](#upgrading-from-2x-to-3x)
    + [Upgrading from 1.x to 2.x](#upgrading-from-1x-to-2x)
+ [Usage](#usage)
  + [Configuration](#configuration)
  + [Develop](#develop)
  + [Build](#build)
  + [Deploy](#deploy)
  + [Electron](#electron)
+ [Screenshots](#screenshots)
+ [Donate](#donate)
+ [Maintainer](#maintainer)
+ [Contribute](#contribute)
+ [License](#license)

## Install

The easiest way to install is via cloning this repository:

```zsh
user@local:~$ git clone https://github.com/mserajnik/hydrusrvue.git
user@local:~$ cd hydrusrvue
user@local:hydrusrvue$ yarn
```

### Dependencies

+ [hydrusrv][hydrusrv] (`8.x` for hydrusrvue `5.x`)
+ [Node.js][node-js]
+ [Yarn][yarn]

I usually use the latest versions; if there has not been an update to this
repository in a while and something breaks on the latest Node/Yarn version,
please [let me know][issues].

### Updating

If you have installed via cloning the repository, you can update via Git:

```zsh
user@local:hydrusrvue$ git pull
user@local:hydrusrvue$ yarn
```

Always make sure to run `yarn` after updating to install any packages you might
be missing.

hydrusrvue follows [Semantic Versioning][semantic-versioning] and any breaking
changes that require additional attention will be released under a new major
version (e.g., `2.0.0`). Minor version updates (e.g., `1.1.0` or `1.2.0`) are
therefore always safe to simply install via the routine mentioned before.

When necessary, this section will be expanded with upgrade guides to new major
versions.

#### Upgrading from 4.x to 5.x

Upgrading from `4.x` to `5.x` can be done via `git pull && yarn`.

The major version bump was made due to the incompatibility of `4.x` with
hydrusrv `8.x`. So if you are using that version, you need to upgrade
hydrusrvue to `5.x`.

#### Upgrading from 3.x to 4.x

Upgrading from `3.x` to `4.x` can be done via `git pull && yarn`.

The major version bump was made due to the incompatibility of `3.x` with
hydrusrv `7.x`. So if you are using that version, you need to upgrade
hydrusrvue to `4.x`.

#### Upgrading from 2.x to 3.x

Upgrading from `2.x` to `3.x` can be done via `git pull && yarn`.

The major version bump was made due to the incompatibility of `2.x` with
hydrusrv `6.x`. So if you are using that version, you need to upgrade
hydrusrvue to `3.x`.

#### Upgrading from 1.x to 2.x

Upgrading from `1.x` to `2.x` can be done via `git pull && yarn` and requires
manual updates/changes in `.env`.

The major version bump was made due to the incompatibility of `1.x` with
hydrusrv `5.x`. So if you are using that version, you need to upgrade
hydrusrvue to `2.x`.

## Usage

### Configuration

Duplicate `.env.example` as `.env`. Make use of the following options to
configure your installation:

+ `VUE_APP_TITLE=hydrusrvue`: sets the title of your installation. It is used
  throughout the whole application, making it possible to add some personal
  flavor/branding.
+ `VUE_APP_SUBTITLE=A Vue-based frontend for <a href="https://github.com/mserajnik/hydrusrv" target="_blank" rel="noopener">hydrusrv</a>`:
  if not empty, sets a subtitle that is displayed on the home view. Allows the
  usage of HTML (e.g., to display links).
+ `VUE_APP_DESCRIPTION=A Vue-based frontend for hydrusrv`: sets the content
  of `<meta name="description">`. Be advised that hydrusrvue is not opmitized
  for search engines and that they might decide to ignore the description even
  if provided.
+ `VUE_APP_ROBOTS=noindex, nofollow`: sets the content of
  `<meta name="robots">`.
+ `VUE_APP_PRIMARY_COLOR='#3498db'`: sets the primary color used throughout
  hydrusrvue. Make sure to use a color that contrasts well with white.
+ `VUE_APP_USE_NORMAL_LETTER_CASE=false`: by default, hydrusrvue uses lowercase
  text throughout most of the application (like hydrus client) for aesthestic
  reasons. If you do not want that, setting this to `false` disables these case
  transformations.
+ `VUE_APP_API_URL=https://example.com/api`: the URL to your hydrusrv
  API. __No trailing slashes.__
+ `VUE_APP_REGISTRATION_ENABLED=true`: setting this to `false` disables the
  registration page. This does not disable the registration in your hydrusrv
  installation; to achieve this, use the appropriate hydrusrv setting.
+ `VUE_APP_AUTHENTICATION_REQUIRED=true`: setting this to `false` allows the
  access of all views aside the user view without logging in. This only affects
  the frontend and must mirror the setting in hydrusrv for it to work correctly
  and without creating user experience issues.
+ `VUE_APP_MIN_PASSWORD_LENGTH=16`: sets the minimum password length when
  registering or updating the password. Providing a higher value than `1024`
  will discard the value and use `1024` as the minimum length instead. This
  is only used for frontend validation and should mirror the setting in
  hydrusrv for the best user experience.
+ `VUE_APP_COUNTS_ENABLED=false`: setting this to `true` enables the display of
  counts when listing files and tags. The corresponding setting in hydrusrv
  must also be enabled if set to `true`.
+ `VUE_APP_FALLBACK_FILES_SORTING_NAMESPACE=namespace`: sets the fallback
  sorting namespace that is needed to not break namespace sorting. Should be
  set to something sensible like `creator` or `series`, depending on your
  preferences.
+ `VUE_APP_DEFAULT_NAMESPACE_COLORS='character#00b401|creator#bb1800|meta#000000|person#008f00|series#bb2cb9|studio#941100'`:
  sets default colors for the given namespaces. The user will not be able to
  change those colors in his settings until tags under the configured
  namespaces exist. Once such tags are added to hydrusrv, the user will see the
  default colors and be able to override them.
+ `VUE_APP_FALLBACK_TAG_COLOR='#0088fb'`: sets the fallback color for
  non-namespaced tags (if not overriden by the user).

### Develop

```zsh
user@local:hydrusrvue$ yarn serve
```

### Build

```zsh
user@local:hydrusrvue$ yarn build
```

### Deploy

After running `yarn build`, copy the content from `dist` to any webspace.

### Electron

__Disclaimer:__ Electron support is experimental, untested on most platforms
and might contain application-breaking bugs.

#### Develop

```zsh
user@local:hydrusrvue$ yarn serve:electron
```

#### Build

```zsh
user@local:hydrusrvue$ yarn build:electron
```

This creates a build for your current platform. You can find the built
application in `dist_electron`. Take a look at the
[electron-builder CLI parameters][electron-builder-cli] (the _Building_
section) to learn how to built for other platforms. You can just attach the
parameter to the `yarn build:electron` command. E.g., to build for Windows x64:

```zsh
user@local:hydrusrvue$ yarn build:electron --win --x64
```

For more elaborate configuration options, take a look at the
[electron-builder configuration][electron-builder-configuration].

## Screenshots

![Frontpage][screenshot-frontpage]

![Searching files with tags][screenshot-search]

![Files sorting options][screenshot-sorting]

![File detail page][screenshot-detail]

![Searching tags][screenshot-tags]

![Configuring settings][screenshot-settings]

![Changing user data][screenshot-user]

## Donate

If you like hydrusrvue and want to buy me a coffee, feel free to donate via
PayPal:

[![Donate via PayPal][paypal-image]][paypal]

Alternatively, you can also send me BTC:

![Donate BTC][btc-image]  
`13jRyroNn8QF4mbGZxKS6mR3PsxjYTsGsu`

Donations are unnecessary, but very much appreciated. :)

## Maintainer

[mserajnik][maintainer]

## Contribute

You are welcome to help out!

[Open an issue][issues] or submit a pull request.

## License

[MIT](LICENSE.md) © Michael Serajnik

[hydrusrv]: https://github.com/mserajnik/hydrusrv
[vue]: https://vuejs.org/
[hydrus-server]: http://hydrusnetwork.github.io/hydrus
[bulma]: https://bulma.io/
[lazy-loading-routes]: https://router.vuejs.org/guide/advanced/lazy-loading.html
[vue-cli]: https://cli.vuejs.org/
[modern-mode]: https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode
[electron]: https://electronjs.org/
[node-js]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/
[semantic-versioning]: https://semver.org/
[electron-builder-cli]: https://www.electron.build/cli
[electron-builder-configuration]: https://www.electron.build/configuration/configuration#configuration
[hydrusrv-docker]: https://github.com/mserajnik/hydrusrv-docker
[vultr-cloud-compute]: https://www.vultr.com/pricing/

[screenshot-frontpage]: https://github.com/mserajnik/hydrusrvue/raw/master/media/screenshot-frontpage.png
[screenshot-search]: https://github.com/mserajnik/hydrusrvue/raw/master/media/screenshot-search.png
[screenshot-sorting]: https://github.com/mserajnik/hydrusrvue/raw/master/media/screenshot-sorting.png
[screenshot-detail]: https://github.com/mserajnik/hydrusrvue/raw/master/media/screenshot-detail.png
[screenshot-tags]: https://github.com/mserajnik/hydrusrvue/raw/master/media/screenshot-tags.png
[screenshot-settings]: https://github.com/mserajnik/hydrusrvue/raw/master/media/screenshot-settings.png
[screenshot-user]: https://github.com/mserajnik/hydrusrvue/raw/master/media/screenshot-user.png

[paypal]: https://www.paypal.me/mserajnik
[paypal-image]: https://www.paypalobjects.com/webstatic/en_US/i/btn/png/blue-rect-paypal-26px.png
[btc-image]: https://mserajnik.at/external/btc.png

[maintainer]: https://github.com/mserajnik
[issues]: https://github.com/mserajnik/hydrusrvue/issues/new

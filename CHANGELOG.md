# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Removed

+ Removed FOSSA badge
+ Removed links to demo

## [5.2.0] - 2019-02-15

### Changed

+ Updated dependencies

## [5.1.0] - 2019-02-04

### Changed

+ Updated dependencies

## [5.0.0] - 2019-01-29

### Added

+ Added support for searching files with wildcarded tags

### Changed

+ Updated dependencies

## [4.2.1] - 2019-01-24

### Fixed

+ Fixed sorting namespaces not being removable

## [4.2.0] - 2019-01-24

### Changed

+ Disabled source maps for production builds
+ Improved the display of submit buttons
+ Refactored code
+ Updated dependencies

### Fixed

Removed console message when not catching API promise error

## [4.1.0] - 2019-01-19

### Changed

+ Improved the behavior on mobile devices
+ Updated dependencies

## [4.0.0] - 2019-01-15

### Added

+ Added the display of user information

### Changed

+ Changed the settings so they can be applied for each user separately
+ Refactored code
+ Updated dependencies

## [3.3.0] - 2019-01-10

### Changed

+ Refactored code
+ Updated dependencies

## [3.2.0] - 2019-01-08

### Changed

+ The scroll to top bar is now hidden on smaller screens since there is no
  real benefit (mobile browsers usually have a shortcut button/gesture)

### Fixed

+ Fixed scroll jumping when toggling the scroll to top bar

## [3.1.0] - 2019-01-08

### Added

+ Added a scroll to top bar to the files and tags views

### Changed

+ Refactored code

## [3.0.2] - 2018-12-31

### Fixed

+ Fixed the constraint autocompletion stopping after the first step when
  clicking on a suggestion (instead of using the keyboard to select it)

## [3.0.1] - 2018-12-28

### Fixed

+ Fixed wrong version number in upgrade instructions

## [3.0.0] - 2018-12-28

### Added

+ Added support for sorting files by amount of tags
+ Added support for filtering files by constraints
+ Added the ability to display a subtitle on the home view
+ Added the ability to use normal letter case throughout the application
+ Added the help view

### Changed

+ Improved the tag autocomplete handling so it cancels unnecessary pending
  requests and no longer displays suggestions from requests that resolve after
  a search has been started
+ Changed file downloads so the hash is used as the file name instead of the ID
+ Updated dependencies

### Fixed

+ Fixed the alignment of items in dropdowns when an icon is present
+ Fixed wrong file extensions when downloading a file

## [2.2.1] - 2018-12-11

### Fixed

+ Fixed scroll jumping when loading files or tags

## [2.2.0] - 2018-12-11

### Added

+ Added ability to change primary color via environment variable

### Changed

+ Updated dependencies

### Fixed

+ Fixed scroll preservation not working correctly when navigating back due to
  autofocus always jumping to the input field
+ Fixed count sometimes not showing correctly in Electron

## [2.1.0] - 2018-12-10

### Changed

+ Improved `scroll` event handling performance and made sure additional items
  get loaded automatically (if not already on the last page) in case the
  document is too short to scroll
+ Optimized count display and made it less jumpy when running a new search
+ Made autocomplete dropdown less jumpy while typing
+ Updated dependencies

## [2.0.0] - 2018-12-09

### Added

+ Added ability to consume counts when listing files and tags
+ Added number formatting based on locale

### Changed

+ Updated hydrusrv API consumption to remain compatible
+ The next page is now fetched slightly before reaching the bottom of the
  window to improve user experience when scrolling
+ Icons are now used for input labels
+ Made some small styling adjustments
+ Updated dependencies

## [1.14.0] - 2018-12-05

### Changed

+ Cleaned up environment variables
+ Updated dependencies

## [1.13.0] - 2018-12-04

### Changed

+ Removed unnecessary media tokens from requests of logged in users when
  `VUE_APP_AUTHENTICATION_REQUIRED` is set to false
+ Updated dependencies

## [1.12.0] - 2018-11-25

### Added

+ Added an `VUE_APP_AUTHENTICATION_REQUIRED` setting that can be used to make
  authentication optional instead of needed for accessing
  non-authentication-related views (relates to the setting in hydrusrv)

### Changed

+ Updated dependencies

## [1.11.0] - 2018-11-20

### Changed

+ Updated dependencies

### Fixed

+ Fixed input from home search form not being sanitized

## [1.10.0] - 2018-11-18

### Changed

+ Changed tag handling so spaces are no longer replaced with underscores
+ Overhauled file search forms to improve UX
+ Updated dependencies

## [1.9.1] - 2018-11-11

### Fixed

+ Fixed application breaking on missing unnamespaced tag default color

## [1.9.0] - 2018-11-10

### Added

+ Added configurable default namespace colors

### Changed

+ Adjusted thumbnails
+ Updated dependencies

## [1.8.0] - 2018-11-09

### Changed

+ Updated dependencies

## [1.7.0] - 2018-11-05

### Changed

+ Updated Travis CI configuration
+ Updated dependencies

## [1.6.0] - 2018-10-24

### Changed

+ Updated dependencies

## [1.5.0] - 2018-10-01

### Changed

+ Unified `meta` tags casing
+ Updated dependencies

### Fixed

+ Fixed `restrictImageSize` flag getting set to `null` if there is no value yet

## [1.4.0] - 2018-09-17

### Changed

+ Adjusted active tags display to better highlight excluded tags
+ Updated screenshots
+ Updated dependencies

## [1.3.0] - 2018-08-30

### Added

+ Added FOSSA badge

### Changed

+ Updated dependencies

## [1.2.0] - 2018-08-29

### Added

+ Added experimental Electron support

### Changed

+ Updated dependencies

## [1.1.2] - 2018-08-27

### Added

+ Added information about demo installation

## [1.1.1] - 2018-08-24

### Fixed

+ Made `minPasswordLength` a normal data property instead of a computed one

## [1.1.0] - 2018-08-22

### Changed

+ Allowed starting gallery mode even on non-supported files to prevent issues
  with PhotoSwipe not calculating the correct thumbnail position
+ Renamed `files` property to `fileCount` to be in line with hydrusrv

## 1.0.0 - 2018-08-19

### Added

+ Initial release

[Unreleased]: https://github.com/mserajnik/hydrusrvue/compare/5.2.0...develop
[5.2.0]: https://github.com/mserajnik/hydrusrvue/compare/5.1.0...5.2.0
[5.1.0]: https://github.com/mserajnik/hydrusrvue/compare/5.0.0...5.1.0
[5.0.0]: https://github.com/mserajnik/hydrusrvue/compare/4.2.1...5.0.0
[4.2.1]: https://github.com/mserajnik/hydrusrvue/compare/4.2.0...4.2.1
[4.2.0]: https://github.com/mserajnik/hydrusrvue/compare/4.1.0...4.2.0
[4.1.0]: https://github.com/mserajnik/hydrusrvue/compare/4.0.0...4.1.0
[4.0.0]: https://github.com/mserajnik/hydrusrvue/compare/3.3.0...4.0.0
[3.3.0]: https://github.com/mserajnik/hydrusrvue/compare/3.2.0...3.3.0
[3.2.0]: https://github.com/mserajnik/hydrusrvue/compare/3.1.0...3.2.0
[3.1.0]: https://github.com/mserajnik/hydrusrvue/compare/3.0.2...3.1.0
[3.0.2]: https://github.com/mserajnik/hydrusrvue/compare/3.0.1...3.0.2
[3.0.1]: https://github.com/mserajnik/hydrusrvue/compare/3.0.0...3.0.1
[3.0.0]: https://github.com/mserajnik/hydrusrvue/compare/2.2.1...3.0.0
[2.2.1]: https://github.com/mserajnik/hydrusrvue/compare/2.2.0...2.2.1
[2.2.0]: https://github.com/mserajnik/hydrusrvue/compare/2.1.0...2.2.0
[2.1.0]: https://github.com/mserajnik/hydrusrvue/compare/2.0.0...2.1.0
[2.0.0]: https://github.com/mserajnik/hydrusrvue/compare/1.14.0...2.0.0
[1.14.0]: https://github.com/mserajnik/hydrusrvue/compare/1.13.0...1.14.0
[1.13.0]: https://github.com/mserajnik/hydrusrvue/compare/1.12.0...1.13.0
[1.12.0]: https://github.com/mserajnik/hydrusrvue/compare/1.11.0...1.12.0
[1.11.0]: https://github.com/mserajnik/hydrusrvue/compare/1.10.0...1.11.0
[1.10.0]: https://github.com/mserajnik/hydrusrvue/compare/1.9.1...1.10.0
[1.9.1]: https://github.com/mserajnik/hydrusrvue/compare/1.9.0...1.9.1
[1.9.0]: https://github.com/mserajnik/hydrusrvue/compare/1.8.0...1.9.0
[1.8.0]: https://github.com/mserajnik/hydrusrvue/compare/1.7.0...1.8.0
[1.7.0]: https://github.com/mserajnik/hydrusrvue/compare/1.6.0...1.7.0
[1.6.0]: https://github.com/mserajnik/hydrusrvue/compare/1.5.0...1.6.0
[1.5.0]: https://github.com/mserajnik/hydrusrvue/compare/1.4.0...1.5.0
[1.4.0]: https://github.com/mserajnik/hydrusrvue/compare/1.3.0...1.4.0
[1.3.0]: https://github.com/mserajnik/hydrusrvue/compare/1.2.0...1.3.0
[1.2.0]: https://github.com/mserajnik/hydrusrvue/compare/1.1.2...1.2.0
[1.1.2]: https://github.com/mserajnik/hydrusrvue/compare/1.1.1...1.1.2
[1.1.1]: https://github.com/mserajnik/hydrusrvue/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/mserajnik/hydrusrvue/compare/1.0.0...1.1.0

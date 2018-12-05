# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

+ Cleaned up environment variables

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

[Unreleased]: https://github.com/mserajnik/hydrusrvue/compare/1.13.0...develop
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

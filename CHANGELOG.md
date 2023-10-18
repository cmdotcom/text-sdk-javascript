## [2.0.0] - 2023-10-18
### Changed
- Removed dependencies on `http`, `bluebird`, `request`
- Use customgrouping3 instead of customgrouping for categorization
- Target `ES2022` instead of `ES5`

## Removed
- Possibility to use a query string
- Deprecated methods from `MessageApiClient.ts`

## [1.4.1] - 2022-12-12
### Changed
- Update model for WhatsApp Interactive.


## [1.4.0] - 2022-12-09
### Added
- Add missing models to send WhatsApp interactive messages
- Add missing models to send Apple Messages for Business listpicker messages.

## [1.3.6] - 2022-12-05
### Added
- Support for the Telegram channel
### Updated
- Several dependency updates.

## [1.3.5] - 2021-07-06
### Added
- Support for the Instagram channel

## [1.3.4] - 2021-04-09
### Added
- Support for the Facebook Messenger and Google Business Messages channel

## [1.3.3] - 2020-12-23
### Added
- Support for the MobilePush channel

## [1.3.2] - 2020-08-20
### Fixed
- Moved from ClientResponse to IncomingMessage in the external api as well.

## [1.3.1] - 2020-08-19
### Fixed
- Moved from ClientResponse to IncomingMessage to support higher node/ts versions.
- Updated devDependencies to for audit fixes.

## [1.3.0] - 2020-06-15
### Added
- Support for Twitter as channel.

### Security
- Updated dependencies (audit-fixes).

## [1.2.0] - 2020-01-30
### Added
- Support for whatsapp templates.

### Security
- Updated dependencies (audit-fixes).

## [1.1.0] - 2019-03-13
### Added
- Added several features for RichContent in messages.

## [1.0.0] - 2019-02-21
### Major
This version is set to 1.0.0, as 0.2.0 is stable for current users.
Version itself does not include new features to the current limited set,
but it will be easier to manage possible breaking changes from now on.

### Dependencies
- Updated dependencies (audit-fixes).

## [0.2.0] - 2018-10-31
### Added
- Ability to set reference.
- Added keywords in package.json.

## [0.1.0] - 2018-09-27
### Added
- Shields and updated README.md

## [0.0.1] - 2018-09-19
### Added
- Moved from Github(CMTelecom to cmdotcom).
- Moved on npm to @cmdotcom.

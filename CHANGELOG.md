# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Norwegian and Norwegian variant translation.

## [0.12.0] - 2021-10-18

### Added
- I18n Ar, Hu.

## [0.11.0] - 2021-09-28

### Added
- `customPixelEventId` to `modal-layout` block.

## [0.10.0] - 2021-04-22

### Added
- I18n Da, Fi, Ja, Ko and Ro.
- Crowdin configuration file.

## [0.9.0] - 2021-01-13
### Added
- New CSS Handle: `modal`.
- Add prop `classes` to exported components.

### Fixed
- Avoid usage of `findDOMNode`.

### Changed
- Migrate to vtex.css-handles@1.x.

## [0.8.0] - 2021-01-11 [YANKED]
### Added
- Prop `zIndexValue` to the `modal-layout` block.

## [0.7.3] - 2020-12-04
### Fixed
- Close modal when the URL changes.

## [0.7.2] - 2020-12-01
### Fixed
- Types from `ModalContext`.

## [0.7.1] - 2020-09-15
### Fixed
- Trigger `load-session` not working when some other modal renders before the `load-session` modal.

### Security
- Bump dependencies versions.

## [0.7.0] - 2020-09-08
### Added
- `customPixelEventId` to `modal-trigger` block.

## [0.6.1] - 2020-07-08
### Fixed
- Modal changing the behavior of the back button.

### Removed
- Feature to close the modal when the back button is clicked.

## [0.6.0] - 2020-06-22
### Added
- Export component `ModelContextProvider` in `ModelContext` entrypoint.

### Fixed
- Backdrop not working if component is used directly (not using blocks).

## [0.5.1] - 2020-06-10
### Fixed
- Updated README.md file with `modal-header` and `modal-content` blocks and new prop tables.

## [0.5.0] - 2020-05-21
### Added
- `modal-actions.close` interface, to allow users to add a button to close the modal.

## [0.4.2] - 2020-05-18
### Changed
- Update dependencies.
- Add tests.

## [0.4.1] - 2020-05-13
### Changed
- Update tooling and fix lint problems.

## [0.4.0] - 2020-04-30
### Added
- New Trigger `load-session` to the `modal-trigger` block.

## [0.3.4] - 2020-04-27
### Fixed
- Scroll lock not freeing the body after it closes the modal in some cases.

## [0.3.3] - 2020-04-06
### Fixed
- Remove unnecessary `fowardRef`.

## [0.3.2] - 2020-04-06

## [0.3.1] - 2020-03-23
### Fixed
- Screen moving to the right when open the modal due to the space of the scroll bar.

### Security
- Bump `acorn` version in `/react`.

## [0.3.0] - 2020-03-06
### Added
- CSS handle when in the `modal-actions` block when you reach the bottom of the content in scroll.
- Prop `iconCloseSize` to the `modal-header` block.

### Changed
- Use `React.memo` in some components to improve performance when you scroll the content.

### Fixed
- Close button not working if the user uses a position absolute with it.

## [0.2.0] - 2020-03-03
### Added
- `modal-actions` block.

## [0.1.1] - 2020-02-17
### Fixed
- Not being able to create links with `target="_blank"` inside of the modals.

## [0.1.0] - 2020-01-30
### Changed
- Launch first stable version.
- Add `overflow: auto;` to `paperScrollContent` handle.

## [0.0.2] - 2020-01-29
### Changed
- Export `useModalDispatch` hook.

### Fixed
- Modal not removing the `hiddenBody` class if it gets unmounted without beeing closed.

## [0.0.1] - 2020-01-27
### Added
- Basic implementations of the components `Backdrop`, `BaseModal` and `Modal`.
- Context to open and close the modal.
- Support to `fullScreen` mode.
- `scroll` and `showContentDividers` props.
- Dismiss when press `Esc` key.
- Basic support to animations + `Fade` animation component.
- Create the `modal-content` and `modal-header` blocks.
- Trigger options.
- Close with back button of the browser.
- Support for alternative containers.

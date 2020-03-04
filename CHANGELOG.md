# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- CSS handle when in the `modal-actions` block when you reach the bottom of the content in scroll.
- Prop `iconCloseSize` to the `modal-header` block.

### Changed
- Use `React.memo` in some components to improve performance when you scroll the content.

### Fixed
- Close button not working if you use position absolute with it.

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

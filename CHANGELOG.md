# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
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

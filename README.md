# thaw-http-json-client-node
JSON Web service client built on Node.js HTTP

Obligatory BadgeFest:

[![codeclimate][codeclimate-badge-image]][codeclimate-url]
[![git][git-badge-image]][git-url]
[![github][github-badge-image]][github-url]
[![npm][npm-badge-image]][npm-url]
[![packagephobia][packagephobia-badge-image]][packagephobia-url]
[![terminal][terminal-badge-image]][terminal-url]
[![travis][travis-badge-image]][travis-url]
[![typescript][typescript-badge-image]][typescript-url]

[![build status][build-status-badge-image]][build-status-url]
[![npm version][npm-version-badge-image]][npm-version-url]
[![latest tag][latest-tag-badge-image]][latest-tag-url]
[![npm total downloads][npm-total-downloads-badge-image]][npm-total-downloads-url]
[![watchers][watchers-badge-image]][watchers-url]
[![stars][stars-badge-image]][stars-url]
[![forks][forks-badge-image]][forks-url]
[![repo dependents][repo-dependents-badge-image]][repo-dependents-url]
[![pkg dependents][pkg-dependents-badge-image]][pkg-dependents-url]
[![commits][commits-badge-image]][commits-url]
[![last commit][last-commit-badge-image]][last-commit-url]
[![types][types-badge-image]][types-url]
[![install size][install-size-badge-image]][install-size-url]
[![known vulnerabilities][known-vulnerabilities-badge-image]][known-vulnerabilities-url]
[![lines of code][lines-of-code-badge-image]][lines-of-code-url]
[![technical debt][technical-debt-badge-image]][technical-debt-url]
[![code style: prettier][prettier-badge-image]][prettier-url]
[![license][license-badge-image]][license-url]

<!-- [![dependents](https://badgen.net/npm/dependents/thaw-http-json-client-node)](https://badgen.net/npm/dependents/thaw-http-json-client-node) -->

## License
[MIT](https://choosealicense.com/licenses/mit/)

[codeclimate-badge-image]: https://badgen.net/badge/icon/codeclimate?icon=codeclimate&label
[codeclimate-url]: https://codeclimate.com
[git-badge-image]: https://badgen.net/badge/icon/git?icon=git&label
[git-url]: https://git-scm.com
[github-badge-image]: https://badgen.net/badge/icon/github?icon=github&label
[github-url]: https://github.com
[npm-badge-image]: https://badgen.net/badge/icon/npm?icon=npm&label
[npm-url]: https://npmjs.com
[packagephobia-badge-image]: https://badgen.net/badge/icon/packagephobia?icon=packagephobia&label
[packagephobia-url]: https://packagephobia.com/
[terminal-badge-image]: https://badgen.net/badge/icon/terminal?icon=terminal&label
[terminal-url]: https://en.wikipedia.org/wiki/History_of_Unix
[travis-badge-image]: https://badgen.net/badge/icon/travis?icon=travis&label
[travis-url]: https://travis-ci.com
[typescript-badge-image]: https://badgen.net/badge/icon/typescript?icon=typescript&label
[typescript-url]: https://www.typescriptlang.org

[build-status-badge-image]: https://secure.travis-ci.org/tom-weatherhead/thaw-http-json-client-node.svg
[build-status-url]: https://travis-ci.org/tom-weatherhead/thaw-http-json-client-node
[npm-version-badge-image]: https://img.shields.io/npm/v/thaw-http-json-client-node.svg
[npm-version-url]: https://www.npmjs.com/package/thaw-http-json-client-node
[latest-tag-badge-image]: https://badgen.net/github/tag/tom-weatherhead/thaw-http-json-client-node
[latest-tag-url]: https://github.com/tom-weatherhead/thaw-http-json-client-node/tags
[npm-total-downloads-badge-image]: https://img.shields.io/npm/dt/thaw-http-json-client-node.svg
[npm-total-downloads-url]: https://www.npmjs.com/package/thaw-http-json-client-node
[watchers-badge-image]: https://badgen.net/github/watchers/tom-weatherhead/thaw-http-json-client-node
[watchers-url]: https://github.com/tom-weatherhead/thaw-http-json-client-node/watchers
[stars-badge-image]: https://badgen.net/github/stars/tom-weatherhead/thaw-http-json-client-node
[stars-url]: https://github.com/tom-weatherhead/thaw-http-json-client-node/stargazers
[forks-badge-image]: https://badgen.net/github/forks/tom-weatherhead/thaw-http-json-client-node
[forks-url]: https://github.com/tom-weatherhead/thaw-http-json-client-node/network/members
[repo-dependents-badge-image]: https://badgen.net/github/dependents-repo/tom-weatherhead/thaw-http-json-client-node
[repo-dependents-url]: https://badgen.net/github/dependents-repo/tom-weatherhead/thaw-http-json-client-node
[pkg-dependents-badge-image]: https://badgen.net/github/dependents-pkg/tom-weatherhead/thaw-http-json-client-node
[pkg-dependents-url]: https://badgen.net/github/dependents-pkg/tom-weatherhead/thaw-http-json-client-node
[commits-badge-image]: https://badgen.net/github/commits/tom-weatherhead/thaw-http-json-client-node
[commits-url]: https://github.com/tom-weatherhead/thaw-http-json-client-node/commits/master
[last-commit-badge-image]: https://badgen.net/github/last-commit/tom-weatherhead/thaw-http-json-client-node
[last-commit-url]: https://badgen.net/github/last-commit/tom-weatherhead/thaw-http-json-client-node
[types-badge-image]: https://badgen.net/npm/types/thaw-http-json-client-node
[types-url]: https://badgen.net/npm/types/thaw-http-json-client-node
[install-size-badge-image]: https://badgen.net/packagephobia/install/thaw-http-json-client-node
[install-size-url]: https://badgen.net/packagephobia/install/thaw-http-json-client-node
[known-vulnerabilities-badge-image]: https://snyk.io/test/github/tom-weatherhead/thaw-http-json-client-node/badge.svg?targetFile=package.json&package-lock.json
[known-vulnerabilities-url]: https://snyk.io/test/github/tom-weatherhead/thaw-http-json-client-node?targetFile=package.json&package-lock.json
[lines-of-code-badge-image]: https://badgen.net/codeclimate/loc/tom-weatherhead/thaw-http-json-client-node
[lines-of-code-url]: https://badgen.net/codeclimate/loc/tom-weatherhead/thaw-http-json-client-node
[technical-debt-badge-image]: https://badgen.net/codeclimate/tech-debt/tom-weatherhead/thaw-http-json-client-node
[technical-debt-url]: https://badgen.net/codeclimate/tech-debt/tom-weatherhead/thaw-http-json-client-node
[prettier-badge-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[license-badge-image]: https://img.shields.io/github/license/mashape/apistatus.svg
[license-url]: https://github.com/tom-weatherhead/thaw-http-json-client-node/blob/master/LICENSE

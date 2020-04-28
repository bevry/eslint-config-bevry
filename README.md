<!-- TITLE/ -->

<h1>eslint-config-bevry</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-travisci"><a href="http://travis-ci.com/bevry/eslint-config-bevry" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/com/bevry/eslint-config-bevry/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/eslint-config-bevry" title="View this project on NPM"><img src="https://img.shields.io/npm/v/eslint-config-bevry.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/eslint-config-bevry" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/eslint-config-bevry.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/bevry/eslint-config-bevry" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/bevry/eslint-config-bevry.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/bevry/eslint-config-bevry#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/bevry/eslint-config-bevry.svg" alt="Dev Dependency Status" /></a></span>
<br class="badge-separator" />
<span class="badge-githubsponsors"><a href="https://github.com/sponsors/balupton" title="Donate to this project using GitHub Sponsors"><img src="https://img.shields.io/badge/github-donate-yellow.svg" alt="GitHub Sponsors donate button" /></a></span>
<span class="badge-patreon"><a href="https://patreon.com/bevry" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
<span class="badge-flattr"><a href="https://flattr.com/profile/balupton" title="Donate to this project using Flattr"><img src="https://img.shields.io/badge/flattr-donate-yellow.svg" alt="Flattr donate button" /></a></span>
<span class="badge-liberapay"><a href="https://liberapay.com/bevry" title="Donate to this project using Liberapay"><img src="https://img.shields.io/badge/liberapay-donate-yellow.svg" alt="Liberapay donate button" /></a></span>
<span class="badge-buymeacoffee"><a href="https://buymeacoffee.com/balupton" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>
<span class="badge-opencollective"><a href="https://opencollective.com/bevry" title="Donate to this project using Open Collective"><img src="https://img.shields.io/badge/open%20collective-donate-yellow.svg" alt="Open Collective donate button" /></a></span>
<span class="badge-crypto"><a href="https://bevry.me/crypto" title="Donate to this project using Cryptocurrency"><img src="https://img.shields.io/badge/crypto-donate-yellow.svg" alt="crypto donate button" /></a></span>
<span class="badge-paypal"><a href="https://bevry.me/paypal" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>
<span class="badge-wishlist"><a href="https://bevry.me/wishlist" title="Buy an item on our wishlist for us"><img src="https://img.shields.io/badge/wishlist-donate-yellow.svg" alt="Wishlist browse button" /></a></span>

<!-- /BADGES -->


Bevry's ESLint configuration is an adaptive configuration that automatically configures ESLint based on the following:

-   If you are using [Editions](https://editions.bevry.me), then make use of the information it provides
-   If you are using Modules (import/export), then configure ESLint for it
-   If you are using a ES5 or below, then configure ESLint for it
    -   Disables incompatible rules that require ES6+
-   If you are using JSX, then configure ESLint for it
-   If you are using React, then configure ESLint for it
    -   Enables the plugin `eslint-plugin-react` and configures it with its recommended rules and the react version you are using
    -   Enables the plugin `eslint-plugin-react-hooks` and configures it with its recommended rules
-   If you are using TypeScript, then configure ESLint for it
    -   Enables the plugin `eslint-plugin-typescript`
    -   Configures the parser as `typescript-eslint-parser`
    -   Disables incompatible rules that require JavaScript
-   If you are using `eslint-plugin-babel`, then configure ESLint for it
    -   Enables the plugin, and automatically configures the rule replacements
-   If you are using `babel-eslint`, then configure ESLint for it
-   If you are using Prettier, the configure ESLint for it
    -   Enables the configuration `eslint-config-prettier`
    -   Enables the plugin `eslint-plugin-prettier` and configures it with its recommended rules
    -   Enables the other prettier configurations automatically based on feature/language usage

To make use of it, you must first install it as a development dependency:

```bash
npm install --save-dev eslint-config-bevry
```

Then for full automatic usage, the only ESLint configuration you will need is to add the following to your `package.json` file:

```json
{
    "eslintConfig": {
        "extends": ["bevry"]
    }
}
```

If you would like more control, rather than extending `bevry` directly, you can extend the individual parts instead:

-   `bevry/rules` contains the rules for our coding standard, you can use or not use this to your liking
-   `bevry/adapt` contains the adaptive configuration, this should be the last extension you apply

To ensure it is working, compare the results of the following command with what you would expect:

```bash
npx eslint --print-config .
```

<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/bevry/eslint-config-bevry/blob/master/HISTORY.md#files">Discover the release history by heading on over to the <code>HISTORY.md</code> file.</a>

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

<h2>Contribute</h2>

<a href="https://github.com/bevry/eslint-config-bevry/blob/master/CONTRIBUTING.md#files">Discover how you can contribute by heading on over to the <code>CONTRIBUTING.md</code> file.</a>

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li><a href="http://balupton.com">Benjamin Lupton</a> — <a href="https://github.com/bevry/eslint-config-bevry/commits?author=balupton" title="View the GitHub contributions of Benjamin Lupton on repository bevry/eslint-config-bevry">view contributions</a></li></ul>

<h3>Sponsors</h3>

No sponsors yet! Will you be the first?

<span class="badge-githubsponsors"><a href="https://github.com/sponsors/balupton" title="Donate to this project using GitHub Sponsors"><img src="https://img.shields.io/badge/github-donate-yellow.svg" alt="GitHub Sponsors donate button" /></a></span>
<span class="badge-patreon"><a href="https://patreon.com/bevry" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
<span class="badge-flattr"><a href="https://flattr.com/profile/balupton" title="Donate to this project using Flattr"><img src="https://img.shields.io/badge/flattr-donate-yellow.svg" alt="Flattr donate button" /></a></span>
<span class="badge-liberapay"><a href="https://liberapay.com/bevry" title="Donate to this project using Liberapay"><img src="https://img.shields.io/badge/liberapay-donate-yellow.svg" alt="Liberapay donate button" /></a></span>
<span class="badge-buymeacoffee"><a href="https://buymeacoffee.com/balupton" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>
<span class="badge-opencollective"><a href="https://opencollective.com/bevry" title="Donate to this project using Open Collective"><img src="https://img.shields.io/badge/open%20collective-donate-yellow.svg" alt="Open Collective donate button" /></a></span>
<span class="badge-crypto"><a href="https://bevry.me/crypto" title="Donate to this project using Cryptocurrency"><img src="https://img.shields.io/badge/crypto-donate-yellow.svg" alt="crypto donate button" /></a></span>
<span class="badge-paypal"><a href="https://bevry.me/paypal" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>
<span class="badge-wishlist"><a href="https://bevry.me/wishlist" title="Buy an item on our wishlist for us"><img src="https://img.shields.io/badge/wishlist-donate-yellow.svg" alt="Wishlist browse button" /></a></span>

<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="http://balupton.com">Benjamin Lupton</a> — <a href="https://github.com/bevry/eslint-config-bevry/commits?author=balupton" title="View the GitHub contributions of Benjamin Lupton on repository bevry/eslint-config-bevry">view contributions</a></li>
<li><a href="http://mdm.cc">Michael Duane Mooring</a> — <a href="https://github.com/bevry/eslint-config-bevry/commits?author=mikeumus" title="View the GitHub contributions of Michael Duane Mooring on repository bevry/eslint-config-bevry">view contributions</a></li>
<li><a href="http://robloach.net">Rob Loach</a> — <a href="https://github.com/bevry/eslint-config-bevry/commits?author=RobLoach" title="View the GitHub contributions of Rob Loach on repository bevry/eslint-config-bevry">view contributions</a></li>
<li><a href="http://github.com/apps/dependabot-preview">dependabot-preview[bot]</a> — <a href="https://github.com/bevry/eslint-config-bevry/commits?author=dependabot-preview[bot]" title="View the GitHub contributions of dependabot-preview[bot] on repository bevry/eslint-config-bevry">view contributions</a></li>
<li><a href="http://github.com/apps/dependabot">dependabot[bot]</a> — <a href="https://github.com/bevry/eslint-config-bevry/commits?author=dependabot[bot]" title="View the GitHub contributions of dependabot[bot] on repository bevry/eslint-config-bevry">view contributions</a></li></ul>

<a href="https://github.com/bevry/eslint-config-bevry/blob/master/CONTRIBUTING.md#files">Discover how you can contribute by heading on over to the <code>CONTRIBUTING.md</code> file.</a>

<!-- /BACKERS -->


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; 2018+ <a href="http://balupton.com">Benjamin Lupton</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->

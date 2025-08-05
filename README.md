<!-- TITLE/ -->

# eslint-config-bevry

<!-- /TITLE -->

<!-- BADGES/ -->

<span class="badge-githubworkflow"><a href="https://github.com/bevry/eslint-config-bevry/actions?query=workflow%3Abevry" title="View the status of this project's GitHub Workflow: bevry"><img src="https://github.com/bevry/eslint-config-bevry/workflows/bevry/badge.svg" alt="Status of the GitHub Workflow: bevry" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/eslint-config-bevry" title="View this project on NPM"><img src="https://img.shields.io/npm/v/eslint-config-bevry.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/eslint-config-bevry" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/eslint-config-bevry.svg" alt="NPM downloads" /></a></span>
<br class="badge-separator" />
<span class="badge-githubsponsors"><a href="https://github.com/sponsors/balupton" title="Donate to this project using GitHub Sponsors"><img src="https://img.shields.io/badge/github-donate-yellow.svg" alt="GitHub Sponsors donate button" /></a></span>
<span class="badge-thanksdev"><a href="https://thanks.dev/u/gh/bevry" title="Donate to this project using ThanksDev"><img src="https://img.shields.io/badge/thanksdev-donate-yellow.svg" alt="ThanksDev donate button" /></a></span>
<span class="badge-liberapay"><a href="https://liberapay.com/bevry" title="Donate to this project using Liberapay"><img src="https://img.shields.io/badge/liberapay-donate-yellow.svg" alt="Liberapay donate button" /></a></span>
<span class="badge-buymeacoffee"><a href="https://buymeacoffee.com/balupton" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>
<span class="badge-opencollective"><a href="https://opencollective.com/bevry" title="Donate to this project using Open Collective"><img src="https://img.shields.io/badge/open%20collective-donate-yellow.svg" alt="Open Collective donate button" /></a></span>
<span class="badge-crypto"><a href="https://bevry.me/crypto" title="Donate to this project using Cryptocurrency"><img src="https://img.shields.io/badge/crypto-donate-yellow.svg" alt="crypto donate button" /></a></span>
<span class="badge-paypal"><a href="https://bevry.me/paypal" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>
<br class="badge-separator" />
<span class="badge-discord"><a href="https://discord.gg/nQuXddV7VP" title="Join this project's community on Discord"><img src="https://img.shields.io/discord/1147436445783560193?logo=discord&amp;label=discord" alt="Discord server badge" /></a></span>
<span class="badge-twitch"><a href="https://www.twitch.tv/balupton" title="Join this project's community on Twitch"><img src="https://img.shields.io/twitch/status/balupton?logo=twitch" alt="Twitch community badge" /></a></span>

<!-- /BADGES -->


Bevry's ESLint configuration is an intelligent, self-configuring system that automatically analyzes your project and adapts ESLint configuration accordingly. It performs comprehensive project analysis to detect your development environment and applies the optimal ESLint setup.

**🚀 For the ultimate zero-configuration experience**: Use [**Boundation**](https://github.com/bevry/boundation) - Bevry's automatic scaffolding and upgrading tool. When your project is scaffolded and managed by Boundation, nearly everything (including ESLint, TypeScript, testing, documentation, CI/CD, and more) is automatically configured and maintained using Bevry's battle-tested best practices. Simply run `npx boundation` in your project directory for complete project setup and ongoing maintenance.

## 🔍 **Intelligent Project Analysis**

- **[Boundation](https://github.com/bevry/boundation) Ecosystem** _(optional)_: Complete automation via interactive Q&A system. When using Boundation, virtually all project metadata (editions, dependencies, keywords, browser fields, TypeScript/Babel/React setup, etc.) is automatically injected and managed, eliminating the need for manual configuration of the elements below.
- **[Editions](https://editions.bevry.me) Integration** _(optional)_: When present, analyzes your `package.json` editions to extract syntax, module system, and target environment information
- **Dependency Detection**: Scans `dependencies` and `devDependencies` to automatically enable relevant plugins and configurations
- **Package.json Analysis**: Examines `keywords`, `browser` field, and other metadata to determine your project's target environment
- **ECMAScript Version Intelligence**: Dynamically detects and configures for your specific ECMAScript target (ES5, ES2015, ES2017, ES2020, ES2021+)
    - Automatically disables incompatible rules for older targets
    - Configures appropriate globals and language features
    - Adjusts rule severity based on target capabilities

## ⚙️ **Adaptive Configuration**

- **Module System Detection**: Automatically configures for ES modules or CommonJS based on your project structure
    - Enables [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import) with appropriate module validation
    - Configures TypeScript-aware import rules when applicable
- **Environment-Specific Setup**: Intelligently configures globals and rules for detected environments:
    - **Node.js**: Configures [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n) with module-aware or script-aware settings
    - **Browser**: Applies browser globals and environment-specific rules
    - **Web Workers**: Configures worker and service worker globals
- **Framework Integration**: Automatically detects and configures framework-specific linting:
    - **React**: Enables [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react) with auto-detected React version and [`eslint-plugin-react-hooks`](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
    - **JSX**: Configures JSX parsing and JSX-runtime rules when detected
- **Language Support**: Comprehensive language tooling integration:
    - **TypeScript**: Uses [`typescript-eslint`](https://typescript-eslint.io/) with strict configuration, disables conflicting JavaScript rules
    - **Babel**: Integrates [`@babel/eslint-parser`](https://babeljs.io/docs/babel-eslint-parser) and [`@babel/eslint-plugin`](https://babeljs.io/docs/babel-eslint-plugin) when detected
- **Documentation Standards**: Automatic JSDoc validation with [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc), TypeScript-aware when applicable
- **Code Formatting**: Seamless Prettier integration via [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) (following ESLint v9 best practices)

## 📋 **Comprehensive Rule Set**

The configuration includes **180+ carefully curated ESLint rules** with comprehensive documentation links, organized into:

- **Possible Errors**: Critical error prevention and runtime safety
- **Best Practices**: Code quality and maintainability standards
- **Variables**: Scope and declaration management
- **Node.js/CommonJS**: Server-side JavaScript best practices
- **ECMAScript 6+**: Modern JavaScript features and patterns
- **Stylistic**: Code consistency (delegated to Prettier in ESLint v9+)

All rules automatically adapt based on your detected environment, target ECMAScript version, and enabled features.

## ✨ **Benefits**

- **🚀 Zero Configuration**: Works out-of-the-box with intelligent project detection
- **📦 Dependency-Free**: No need to install or manage individual ESLint plugins
- **🔧 Self-Maintaining**: Configuration updates automatically with your project changes
- **⚡ Performance Optimized**: Only loads and configures plugins you actually need
- **🛡️ Battle-Tested**: Used across Bevry's ecosystem of [200+](https://github.com/bevry/eslint-config-bevry/network/dependents) open source projects

## Usage

Use [boundation](https://github.com/bevry/boundation) to automate installation and maintenance, making the rest of this usage section unnecessary.

Otherwise, to proceed and maintain manually, first install it and ESLint:

```bash
npm install --save-dev eslint eslint-config-bevry
```

> **💡 Zero Plugin Management**: With `eslint-config-bevry`, there's no need to manually install or configure any ESLint plugins (`eslint-plugin-react`, `typescript-eslint`, `eslint-plugin-import`, etc.). The configuration automatically includes and configures all necessary plugins based on your project's detected features, saving you from dependency management complexity.

Then add `eslint.config.js` file to your project root:

```javascript
import { defineConfig } from 'eslint/config'
import eslintBevry from 'eslint-config-bevry'
export default defineConfig(eslintBevry)
```

### Advanced Configuration

`eslint-config-bevry` supports customization through your `package.json` or programmatically:

#### Default Files and Ignores

**Default Files**: When no `files` are specified, eslint-config-bevry automatically includes:

- If [Editions](https://editions.bevry.me) are detected: `{sourceEdition.directory}/**/*.{js,cjs,mjs,jsx,mjsx,ts,cts,mts,tsx,mtsx}`
- Otherwise: `**/*.{js,cjs,mjs,jsx,mjsx,ts,cts,mts,tsx,mtsx}`

**Default Ignores**: Always includes these patterns (your custom ignores are appended):

- `**/*.d.ts` - TypeScript declaration files
- `**/vendor/` - Third-party vendor directories
- `**/node_modules/` - Node.js dependencies

#### Customization Options

**Via package.json:**

```json
{
    "eslintConfig": {
        "files": [
            // Replaces the configuration from `eslint-config-bevry`
            "source/**/*.{js,ts}"
        ],
        "ignores": [
            // Appends to the configuration from `eslint-config-bevry`
            "dist/",
            "*.config.js"
        ],
        "rules": {
            // Overrides the configuration from `eslint-config-bevry`
            "no-console": "off"
        }
    }
}
```

**Programmatic customization:**

```javascript
import { defineConfig } from 'eslint/config'
import eslintBevry from 'eslint-config-bevry'
export default defineConfig({
    extends: [eslintBevry],
    files: [
        // Replaces the configuration from `eslint-config-bevry`
        'source/**/*.{js,ts}',
    ],
    ignores: [
        // Appends to the configuration from `eslint-config-bevry`
        'dist/',
        '*.config.js',
    ],
    rules: {
        // Overrides the configuration from `eslint-config-bevry`
        'no-console': 'off',
    },
})
```

### Running ESLint

Use ESLint as normal:

```bash
npx eslint --fix
```

### Debugging and Inspection

To see, inspect, and debug the resultant configuration:

```bash
npx eslint --inspect-config
```

To validate your configuration is working correctly:

```bash
# Check specific files
npx eslint source/index.js --max-warnings 0

# See what files ESLint will process
npx eslint --dry-run
```

**🔍 Troubleshooting**: If you encounter unexpected behavior, the configuration adapts based on your `package.json` dependencies and metadata. Check that your project's `dependencies`, `devDependencies`, `keywords`, and `editions` accurately reflect your project setup.

<!-- HISTORY/ -->

## History

[Discover the release history by heading on over to the `HISTORY.md` file.](https://github.com/bevry/eslint-config-bevry/blob/HEAD/HISTORY.md#files)

<!-- /HISTORY -->

<!-- BACKERS/ -->

## Backers

### Code

[Discover how to contribute via the `CONTRIBUTING.md` file.](https://github.com/bevry/eslint-config-bevry/blob/HEAD/CONTRIBUTING.md#files)

#### Authors

-   [Benjamin Lupton](https://balupton.com) — Accelerating collaborative wisdom.

#### Maintainers

-   [Benjamin Lupton](https://balupton.com) — Accelerating collaborative wisdom.

#### Contributors

-   [Benjamin Lupton](https://github.com/balupton) — [view contributions](https://github.com/bevry/eslint-config-bevry/commits?author=balupton "View the GitHub contributions of Benjamin Lupton on repository bevry/eslint-config-bevry")
-   [Michael Duane Mooring](https://github.com/mikeumus) — [view contributions](https://github.com/bevry/eslint-config-bevry/commits?author=mikeumus "View the GitHub contributions of Michael Duane Mooring on repository bevry/eslint-config-bevry")
-   [Rob Loach](https://github.com/RobLoach) — [view contributions](https://github.com/bevry/eslint-config-bevry/commits?author=RobLoach "View the GitHub contributions of Rob Loach on repository bevry/eslint-config-bevry")

### Finances

<span class="badge-githubsponsors"><a href="https://github.com/sponsors/balupton" title="Donate to this project using GitHub Sponsors"><img src="https://img.shields.io/badge/github-donate-yellow.svg" alt="GitHub Sponsors donate button" /></a></span>
<span class="badge-thanksdev"><a href="https://thanks.dev/u/gh/bevry" title="Donate to this project using ThanksDev"><img src="https://img.shields.io/badge/thanksdev-donate-yellow.svg" alt="ThanksDev donate button" /></a></span>
<span class="badge-liberapay"><a href="https://liberapay.com/bevry" title="Donate to this project using Liberapay"><img src="https://img.shields.io/badge/liberapay-donate-yellow.svg" alt="Liberapay donate button" /></a></span>
<span class="badge-buymeacoffee"><a href="https://buymeacoffee.com/balupton" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>
<span class="badge-opencollective"><a href="https://opencollective.com/bevry" title="Donate to this project using Open Collective"><img src="https://img.shields.io/badge/open%20collective-donate-yellow.svg" alt="Open Collective donate button" /></a></span>
<span class="badge-crypto"><a href="https://bevry.me/crypto" title="Donate to this project using Cryptocurrency"><img src="https://img.shields.io/badge/crypto-donate-yellow.svg" alt="crypto donate button" /></a></span>
<span class="badge-paypal"><a href="https://bevry.me/paypal" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

#### Sponsors

-   [Andrew Nesbitt](https://nesbitt.io) — Working on mapping the world of open source software @ecosyste-ms  and empowering developers with @octobox
-   [Divinci ™](https://divinci.ai) — A more comfortable AI conversation experience, with friends! 🤖🖤
-   [Mr. Henry](https://mrhenry.be)
-   [Poonacha Medappa](https://poonachamedappa.com)
-   [Roboflow](https://roboflow.com)
-   [Square](https://github.com/square)

#### Donors

-   [Andrew Nesbitt](https://nesbitt.io)
-   [Ángel González](https://univunix.com)
-   [Arjun Aditya](https://arjunaditya.xyz)
-   [Armen Mkrtchian](https://mogoni.dev)
-   [Balsa](https://balsa.com)
-   [Canonical](https://canonical.com)
-   [Chad](https://opencollective.com/chad8)
-   [Codecov](https://codecov.io)
-   [Divinci ™](https://divinci.ai)
-   [dr.dimitru](https://veliovgroup.com)
-   [Elliott Ditman](https://elliottditman.com)
-   [entroniq](https://gitlab.com/entroniq)
-   [Frontend Masters](https://FrontendMasters.com)
-   [GitHub](https://github.com/about)
-   [Hunter Beast](https://cryptoquick.com)
-   [Jean-Luc Geering](https://github.com/jlgeering)
-   [Lee Driscoll](https://leedriscoll.me)
-   [Michael Duane Mooring](https://divinci.app)
-   [Michael Harry Scepaniak](https://michaelscepaniak.com)
-   [Mohammed Shah](https://github.com/smashah)
-   [Mr. Henry](https://mrhenry.be)
-   [Pleo](https://pleo.io)
-   [Poonacha Medappa](https://poonachamedappa.com)
-   [Robert de Forest](https://github.com/rdeforest)
-   [Rob Morris](https://linktr.ee/recipromancer)
-   [Roboflow](https://roboflow.com)
-   [Scott Kempson](https://github.com/scokem)
-   [Sentry](https://sentry.io)
-   [ServieJS](https://github.com/serviejs)
-   [Skunk Team](https://skunk.team)
-   [Square](https://github.com/square)
-   [Syntax](https://syntax.fm)
-   [WriterJohnBuck](https://github.com/WriterJohnBuck)

<!-- /BACKERS -->

<!-- LICENSE/ -->

## License

Unless stated otherwise all works are:

-   Copyright &copy; [Benjamin Lupton](https://balupton.com)

and licensed under:

-   [Artistic License 2.0](http://spdx.org/licenses/Artistic-2.0.html)

<!-- /LICENSE -->

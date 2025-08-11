// ESLint Core
import { globalIgnores } from 'eslint/config'
import globals from 'globals' // eslint-disable-line

// ESLint Plugins
import eslintJS from '@eslint/js'
import eslintReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintPrettier from 'eslint-config-prettier/flat'
import eslintTypescript from 'typescript-eslint'
import eslintNode from 'eslint-plugin-n'
import eslintImport from 'eslint-plugin-import'
import eslintJSDoc from 'eslint-plugin-jsdoc'
import babelParser from '@babel/eslint-parser'
import babelPlugin from '@babel/eslint-plugin'

// @ts-ignore
import versionClean from 'version-clean'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { readJSON } from '@bevry/json'

import filedirname from 'filedirname'
const [, dirname] = filedirname()
const root = dirname.endsWith('source') ? join(dirname, '..') : dirname // on CI dirname is: /home/runner/work/eslint-config-bevry/eslint-config-bevry/source
const pwd = cwd()

import * as rules from './rules.js'
const { IGNORE } = rules

// ------------------------------------
// Prepare

class InlinedError extends Error {
	constructor(dependency) {
		super(
			`the development dependency ${dependency} is now inlined within eslint-config-bevry\nrun: npm uninstall --save-dev ${dependency}`,
		)
	}
}

const bevryPackage = await readJSON(join(root, 'package.json'))
const pkg = {}
try {
	Object.assign(pkg, await readJSON(join(pwd, 'package.json')))
} catch (err) {} // eslint-disable-line

// https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
/** @type {import('eslint').Linter.Config} */
const config = {
	name: bevryPackage.name,
	// version: bevryPackage.version,
	files: pkg.eslintConfig?.files || [],
	// don't use ignores, as it doesn't help us with matched patterns from extended configurations, instead use globalIgnores
	extends: [
		globalIgnores([
			// '**/*.d.ts', <-- now that we fixed the rules that conflict with typescript with v6.1.1, ignoring these isn't necessary anymore
			'**/vendor/',
			'**/node_modules/',
			'**/edition-*/',
			...(pkg.eslintConfig?.ignores || []),
		]),
		rules.beforeEslintRecommended,
		eslintJS.configs.recommended,
		rules.afterEslintRecommended,
	],
	languageOptions: {
		// ecmaVersion: null,
		// sourceType: null,
		globals: {},
		// parser: null,
		parserOptions: {
			ecmaFeatures: {},
		},
	},
	linterOptions: {
		// noInlineConfig: false,
		// reportUnusedDisableDirectives: 'warn',
		// reportUnusedInlineConfigs: 'off',
	},
	// processor: {}
	// plugins: {},
	rules: {},
	settings: {},
	// env has been deprecated: https://eslint.org/docs/latest/use/configure/migration-guide#configuring-language-options
}

// ------------------------------------
// Load

// dependency helpers
const deps = {}
const versions = {}

/**
 * Check if a dependency is included in the caller's package.json
 * @param {string} name package name/identifier for the dependency
 * @returns {boolean} true if the dependency is present, false otherwise
 */
function hasDep(name) {
	return Boolean(deps[name])
}

/**
 * Throws if any of these inlined dependencies are present in the caller's package.json
 * @param {...string} names - The package names or identifiers to check for inlining.
 * @throws {InlinedError} if any of the specified dependencies are present
 */
function inlinedDeps(...names) {
	if (pkg.name === 'eslint-config-bevry') return
	for (const name of names) {
		if (hasDep(name)) {
			throw new InlinedError(name)
		}
	}
}

// Load the dependencies and versions
Object.assign(deps, pkg.dependencies || {}, pkg.devDependencies || {})
Object.keys(deps).forEach((name) => {
	const range = deps[name]
	const version = versionClean(range) || null // resolve to null in case of github references
	versions[name] = version
})

// extract some common items
const keywords = pkg.keywords || []

// ------------------------------------
// Deprecations

inlinedDeps(
	// javascript
	'@eslint/js', // inlined

	// import
	'eslint-plugin-import', // inlined

	// node
	'eslint-plugin-n', // inlined

	// react
	'eslint-plugin-react', // inlined
	'eslint-plugin-react-hooks', // inlined

	// babel
	// https://babeljs.io/docs/babel-eslint-plugin
	'@babel/eslint-parser', // inlined
	'@babel/eslint-plugin', // inlined
	'babel-eslint', // deprecated: @babel/eslint-parser
	'eslint-plugin-babel', // deprecated: @babel/eslint-plugin

	// typescript
	'typescript-eslint', // inlined
	'@typescript-eslint/eslint-plugin', // deprecated: typescript-eslint

	// jsdoc
	'eslint-plugin-jsdoc', // inlined

	// prettier, must come last as it modifies things from nearly all other plugins
	'eslint-config-prettier', // inlined
	'eslint-plugin-prettier', // deprecated: boundation calls prettier separately, as such we just use eslint-config-prettier to disable formatting conflicts
)

// the below are no longer supported by us

// http://flowtype.org which is the old domain is now 404, the new domains is https://flow.org and it still gets updated, however it hasn't been updated for eslint v9 yet, and typescript won, with native typescript support now in node.js and deno
// https://flow.org/en/docs/tools/eslint/
// 'flow-bin',
// 'hermes-eslint', // the required parser, not compatible with eslint v9
// 'eslint-plugin-fb-flow', // the required plugin/config, not compatible with eslint v9
// 'eslint-plugin-flow-vars', // the odl plugin, last update 4 years ago: https://github.com/gajus/eslint-plugin-flowtype

// baseui, the baseui ecosystem has been abandoned: github issues have been disabled, and a notice of limited engagement is in the readme
// 'baseui',
// 'eslint-plugin-baseui', // not comaptible with eslint v9

// ------------------------------------
// Enhancements

// prepare
const ecmascriptNextYear = new Date().getFullYear() - 1
const ecmascriptNextVersion = 'latest'
let ecmascriptVersionSource = ecmascriptNextVersion
let ecmascriptVersionTarget = ecmascriptVersionSource
let sourceType = 'script',
	react = hasDep('react'),
	typescript = hasDep('typescript'),
	babel = hasDep('@babel/core'),
	jsx = false
const prettier = Boolean(pkg.prettier) || hasDep('prettier'),
	browser = Boolean(pkg.browser) || keywords.includes('browser'),
	node = Boolean(pkg.engines?.node) || keywords.includes('node'),
	worker =
		keywords.includes('worker') ||
		keywords.includes('workers') ||
		keywords.includes('webworker') ||
		keywords.includes('webworkers')

/**
 * Ensure the ecmascript version is coerced to an eslint valid ecmascript version
 * @param version
 */
function coerceEcmascriptVersion(version = '') {
	if (version === 'esnext' || version === 'latest' || version === 'next') {
		return ecmascriptNextVersion
	} else if (version) {
		version = versionClean(version)
		if (version) {
			version = Number(version)
			if (version >= ecmascriptNextYear) {
				return ecmascriptNextVersion
			} else {
				return version
			}
		}
	}
	return ''
}

// editions
if (pkg.editions) {
	const sourceEdition = pkg.editions[0]
	const sourceEditionTags = sourceEdition.tags || sourceEdition.syntaxes || []
	const ecmascriptVersionTag = coerceEcmascriptVersion(
		sourceEditionTags.find((tag) => tag.startsWith('es')),
	)
	const ecmascriptVersionEngine = coerceEcmascriptVersion(
		pkg.engines?.ecmascript,
	)
	ecmascriptVersionSource =
		ecmascriptVersionTag || ecmascriptVersionEngine || ecmascriptNextVersion
	ecmascriptVersionTarget =
		ecmascriptVersionEngine || ecmascriptVersionTag || ecmascriptNextVersion
	if (sourceEditionTags.includes('typescript')) {
		typescript = true
	}
	if (
		sourceEditionTags.includes('module') ||
		sourceEditionTags.includes('import')
	) {
		sourceType = 'module'
	} else if (
		sourceEditionTags.includes('script') ||
		sourceEditionTags.includes('require')
	) {
		// commonjs is also supported
		sourceType = 'script'
	}
	if (sourceEditionTags.includes('react')) {
		react = true
	}
	if (sourceEditionTags.includes('babel')) {
		babel = true
	}
	if (sourceEditionTags.includes('jsx') || sourceEditionTags.includes('tsx')) {
		jsx = true
	}
	if (config.files.length === 0) {
		config.files.push(
			`${sourceEdition.directory || '.'}/**/*.{js,cjs,mjs,jsx,mjsx,ts,cts,mts,tsx,mtsx}`,
		)
	}
} else if (config.files.length === 0) {
	config.files.push('**/*.{js,cjs,mjs,jsx,mjsx,ts,cts,mts,tsx,mtsx}')
}

// adjust parser and syntax to the desired ecmascript version
config.languageOptions.ecmaVersion = ecmascriptVersionSource
config.languageOptions.sourceType = sourceType
config.languageOptions.parserOptions.ecmaFeatures.jsx = jsx

// adjust globals to the lowest ecmascript version
if (ecmascriptVersionTarget === 'latest' || ecmascriptVersionTarget >= 2021) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.es2021,
	}
} else if (ecmascriptVersionTarget >= 2020) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.es2020,
	}
} else if (ecmascriptVersionTarget >= 2017) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.es2017,
	}
} else if (ecmascriptVersionTarget >= 2015) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.es2015,
	}
} else if (ecmascriptVersionTarget <= 5) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.es5,
	}
}

if (worker) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.worker,
		...globals.serviceworker,
	}
}

// import
if (sourceType === 'module') {
	// https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#config---flat-with-config-in-typescript-eslint
	config.extends.push(eslintImport.flatConfigs.recommended)
	if (react) {
		config.extends.push(eslintImport.flatConfigs.react)
	}
	config.extends.push(
		eslintImport.flatConfigs.typescript,
		rules.afterImportRecommended,
	)
}

// node
if (node) {
	// https://github.com/eslint-community/eslint-plugin-n#-configs
	if (sourceType === 'module') {
		config.extends.push(eslintNode.configs['flat/recommended-module'])
		if (typescript) {
			Object.assign(config.rules, {
				// This result is broken for TypeScript projects, as in TypeScript you do `import thing from file.js` instead of `file.ts`, as it is about the resultant file, not the source file; TypeScript handles this correctly, however this rule does not
				'n/no-unpublished-import': IGNORE,
			})
		}
	} else {
		config.extends.push(eslintNode.configs['flat/recommended-script'])
	}
	// these globals should be handeld by the plugin above, but add them anyway
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.node,
		...globals.nodeBuiltin,
	}
	config.extends.push(rules.afterNodeRecommended)
}
if (browser) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.browser,
	}
}

// react
if (react) {
	config.extends.push(eslintReact.configs.flat.recommended)
	if (jsx) {
		config.extends.push(eslintReact.configs.flat['jsx-runtime'])
	}
	config.extends.push(eslintReactHooks.configs['recommended-latest'])
}

// babel
// https://babeljs.io/docs/babel-eslint-plugin
if (babel) {
	config.languageOptions.parser = babelParser
	config.plugins.babel = babelPlugin // this already includes the rules and their config, so it seems that the docs are out of date
}

// typescript
if (typescript) {
	Object.assign(config.languageOptions.parserOptions, {
		projectService: true,
		tsconfigRootDir: root,
	})
	config.extends.push(
		// https://typescript-eslint.io/users/configs
		// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslintrc/stylistic-type-checked.ts

		// we extend eslint recommended, and as such, we need to handle disabling it accordingly
		eslintTypescript.configs.eslintRecommended,

		// our project is a typescript project, so it has type checking
		// eslintTypescript.configs.recommendedTypeChecked,

		// our project is a typescript project, so it has type checking
		eslintTypescript.configs.strictTypeChecked,

		// our project is a typescript project, so style it accordingly, this is different from the stylistic plugin and different from prettier
		eslintTypescript.configs.stylisticTypeChecked,

		// our overrides
		rules.afterTypescriptRecommended,
	)
	if (ecmascriptVersionTarget <= 2015) {
		config.extends.push(rules.typescriptEcmascript2015Target)
	}
	config.extends.push(rules.typescriptTests)
} else {
	// jsdoc without typescript
}

// jsdoc
// https://www.npmjs.com/package/eslint-plugin-jsdoc
if (typescript) {
	config.extends.push(eslintJSDoc.configs['flat/recommended-typescript'])
} else {
	// config.extends.push(eslintJSDoc.configs['flat/recommended-typescript-flavor']) <-- consider using this instead of typescript style jsdoc rules and types in javascript files
	config.extends.push(eslintJSDoc.configs['flat/recommended'])
}

// prettier
if (prettier) {
	config.extends.push(eslintPrettier)
}

// this is after typescript, as we need to override defaults from typescript configs
if (ecmascriptVersionSource <= 5) {
	config.extends.push(rules.ecmascript5Source)
}

// user rules overrides
if (pkg.eslintConfig?.rules) {
	Object.extends.push({
		name: 'eslint-config-bevry/package-json',
		rules: pkg.eslintConfig.rules,
	})
}

// ------------------------------------
// Export

export default config

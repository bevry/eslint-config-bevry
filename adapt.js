// @ts-check
'use strict'

// ------------------------------------
// Prepare

class MissingError extends Error {
	constructor(dependency) {
		super(
			`missing development dependency: ${dependency}\nrun: npm install --save-dev ${dependency}`
		)
	}
}

const IGNORE = 0,
	WARN = 1,
	ERROR = 2

const config = {
	settings: {},
	extends: [],
	plugins: [],
	parserOptions: { ecmaFeatures: {} },
	env: {},

	/** @type {Object.<string, number | Array<any>>} */
	rules: {}
}

// ------------------------------------
// Load

// Load data.json file if it exists
const semver = require('semver')
const path = require('path')
const cwd = process.cwd()
const rules = Object.keys(config.rules)
let data = {},
	versions = {}
try {
	// Read package.json
	const packageLocation = path.join(cwd, 'package.json')
	data = require(packageLocation) || {}

	// Determine the dependency versions
	const deps = Object.assign(
		{},
		data.dependencies || {},
		data.devDependencies || {}
	)
	Object.keys(deps).forEach(function(name) {
		const version = deps[name]
		versions[name] = semver.clean(version) || semver.coerce(version).version
	})
} catch (err) {}

// Helpers
function hasDep(name) {
	return Boolean(versions[name])
}

// ------------------------------------
// Enhancements

// Set our defaults
let parser,
	ecmaVersion = new Date().getFullYear() + 1,
	sourceType = 'script',
	react = hasDep('react'),
	flowtype = hasDep('flow-bin'),
	typescript = hasDep('typescript'),
	jsx = false,
	prettier = Boolean(data.prettier)

// If we have editions, then override our defaults
if (data.editions) {
	const sourceEdition = data.editions[0]
	const editionTags = sourceEdition.tags || sourceEdition.syntaxes || []
	const ecmaTag = editionTags.find(
		tag => tag.startsWith('es') && tag !== 'esnext'
	)
	if (ecmaTag) {
		ecmaVersion = Number(ecmaTag.substr(2))
	}
	if (editionTags.includes('typescript')) {
		typescript = true
	}
	if (editionTags.includes('module') || editionTags.includes('import')) {
		sourceType = 'module'
	} else if (
		editionTags.includes('script') ||
		editionTags.includes('require')
	) {
		sourceType = 'script'
	}
	if (editionTags.includes('flowtype')) {
		flowtype = true
	}
	if (editionTags.includes('react')) {
		react = true
	}
	if (editionTags.includes('jsx') || editionTags.includes('tsx')) {
		jsx = true
	}
}

// Custom Parser: TypeScript
if (hasDep('typescript-eslint-parser')) {
	parser = 'typescript-eslint-parser'
} else if (typescript) {
	throw new MissingError('typescript-eslint-parser')
}

// Custom Parser: Babel
if (hasDep('babel-eslint')) {
	parser = 'babel-eslint'
}

// Apply our detections to the configuration
config.parserOptions.ecmaVersion = ecmaVersion
config.parserOptions.sourceType = sourceType
config.parserOptions.ecmaFeatures.jsx = jsx
config.parser = parser

// Set environments depending on whether we need them or not
config.env.es6 = Boolean(ecmaVersion >= 6)
config.env.node = Boolean(data.engines && data.engines.node)
config.env.browser = Boolean(data.browser)
if (config.env.browser) {
	config.env.commonjs = true
	if (config.env.node) {
		config.env['shared-node-browser'] = true
	}
}

// If using legacy javascript, disable esnext rules
if (ecmaVersion <= 5) {
	config.rules['no-var'] = IGNORE
	config.rules['object-shorthand'] = [ERROR, 'never']
	config.rules['prefer-rest-params'] = IGNORE
	config.rules['prefer-spread'] = IGNORE
	config.rules['prefer-const'] = IGNORE
}

// If using typescript, disable incompatible rules
if (typescript) {
	// https://github.com/eslint/typescript-eslint-parser/issues/557
	config.rules['no-undef'] = IGNORE
	// typedoc only uses a subset of jsdoc
	config.rules['valid-jsdoc'] = IGNORE
	// use strict is invalid with typescript
	config.rules.strict = IGNORE
	// typescript has builtin unused detection
	config.rules['no-unused-vars'] = IGNORE
}

// Plugin: TypeScript
if (hasDep('eslint-plugin-typescript')) {
	config.plugins.push('typescript')
} else if (typescript) {
	throw new MissingError('eslint-plugin-typescript')
}

// Plugin: React
if (hasDep('eslint-plugin-react')) {
	config.extends.push('plugin:react/recommended')
	config.plugins.push('react')
	Object.assign(config.settings, {
		react: {
			version: versions.react
		}
	})
} else if (react) {
	throw new MissingError('eslint-plugin-react')
}

// Plugin: React Hooks
if (hasDep('eslint-plugin-react-hooks')) {
	config.plugins.push('react-hooks')
	Object.assign(config.rules, {
		'react-hooks/rules-of-hooks': ERROR
	})
} else if (react) {
	throw new MissingError('eslint-plugin-react-hooks')
}

// Plugin: Babel
if (hasDep('eslint-plugin-babel')) {
	// Remove rules that babel rules replace
	config.plugins.push('babel')
	const replacements = [
		'new-cap',
		'camelcase',
		'no-invalid-this',
		'object-curly-spacing',
		'quotes',
		'semi',
		'no-unused-expressions',
		'valid-typeof'
	]
	replacements.forEach(function(key) {
		if (rules.includes(key)) {
			// config.rules['babel/' + key] = config.rules[key]
			// ^ won't work with the new replacement setup
			config.rules[key] = IGNORE
		}
	})
}

// Plugin: Flow
if (hasDep('eslint-plugin-flow-vars')) {
	config.plugins.push('flow-vars')
	Object.assign(config.rules, {
		'flow-vars/define-flow-type': WARN,
		'flow-vars/use-flow-type': WARN
	})
} else if (flowtype) {
	throw new MissingError('eslint-plugin-flow-vars')
}

// Plugin: Prettier
if (
	hasDep('eslint-plugin-prettier') ||
	hasDep('eslint-config-prettier') ||
	hasDep('prettier')
) {
	prettier = true
}
if (prettier) {
	// Ensure dependencies exist
	if (hasDep('eslint-plugin-prettier') === false) {
		throw new MissingError('eslint-plugin-prettier')
	}
	if (hasDep('eslint-config-prettier') === false) {
		throw new MissingError('eslint-config-prettier')
	}
	if (hasDep('prettier') === false) throw new MissingError('prettier')

	// Add the plugin
	config.plugins.push('prettier')

	// Let the plugin autoconfigure
	config.extends.push('plugin:prettier/recommended')
	// config.extends.push('prettier') <-- doesn't autoconfigure the rules

	// Add flowtype
	if (flowtype) config.extends.push('prettier/flowtype')

	// Add react
	if (react) config.extends.push('prettier/react')
}

// ------------------------------------
// Export

module.exports = config

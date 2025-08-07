// ESLint Core
// import { defineConfig } from "eslint/config";
import globals from 'globals' // eslint-disable-line

// ESLint Plugins
import eslintJS from '@eslint/js'
import eslintReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintPrettier from 'eslint-config-prettier/flat'
import eslintTypescript from 'typescript-eslint' // eslint-disable-line
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

// ------------------------------------
// Prepare

class InlinedError extends Error {
	constructor(dependency) {
		super(
			`the development dependency ${dependency} is now inlined within eslint-config-bevry\nrun: npm uninstall --save-dev ${dependency}`
		)
	}
}

const IGNORE = 0,
	WARN = 1,
	ERROR = 2,
	MAX_PARAMS = 4

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
	ignores: [
		'**/*.d.ts',
		'**/vendor/',
		'**/node_modules/',
		...(pkg.eslintConfig?.ignores || []),
	],
	extends: [eslintJS.configs.recommended],
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
	rules: {
		// ====================================================================
		// ESLint Recommended
		// https://unpkg.com/@eslint/js@9/src/configs/eslint-recommended.js
		// Only keep our overrides when the rules that are different to the recommended defaults
		// To prevent our own rules from disabling the plugin config extensions of each other

		// https://eslint.org/docs/latest/rules/constructor-super
		// Recommended default is enabled to error
		// Makes sense as otherwise runtime error will occur
		// 'constructor-super': ERROR,

		// https://eslint.org/docs/latest/rules/no-case-declarations
		// Recommended default is enabled to error
		// 'no-case-declarations': ERROR,

		// https://eslint.org/docs/latest/rules/no-class-assign
		// Recommended default is enabled to error
		// 'no-class-assign': ERROR,

		// https://eslint.org/docs/latest/rules/no-cond-assign
		// Recommended default is enabled to allow sometimes
		// however we want to always disallow assignments in conditional statements (if, while, etc.)
		'no-cond-assign': [ERROR, 'always'],

		// https://eslint.org/docs/latest/rules/no-const-assign
		// Recommended default is enabled to error
		// 'no-const-assign': ERROR,

		// https://eslint.org/docs/latest/rules/no-constant-condition
		// Recommended default is enabled to allowing for while(true) loops
		// 'no-constant-condition': [ERROR, { checkLoops: false }],

		// https://eslint.org/docs/latest/rules/no-control-regex
		// Recommended default is enabled to error, which is seems like good idea to error about this
		// 'no-control-regex': ERROR,

		// https://eslint.org/docs/latest/rules/no-debugger
		// Recommended default is enabled to error
		// We just want to warn about debugger statements
		'no-debugger': WARN,

		// https://eslint.org/docs/latest/rules/no-delete-var
		// Recommended default is enabled to error
		// Don't use delete, it disables optimisations
		// 'no-delete-var': ERROR,

		// https://eslint.org/docs/latest/rules/no-dupe-args
		// Recommended default is enabled to error on duplicate arguments in a function as it can cause errors
		// 'no-dupe-args': ERROR,

		// https://eslint.org/docs/latest/rules/no-dupe-class-members
		// Recommended default is enabled to error
		// 'no-dupe-class-members': ERROR,

		// https://eslint.org/docs/latest/rules/no-dupe-keys
		// Recommended default is enabled to error on duplicate keys in an object as it can cause errors
		// 'no-dupe-keys': ERROR,

		// https://eslint.org/docs/latest/rules/no-duplicate-case
		// Recommended default is enabled to error on duplicate case statements in a switch
		// 'no-duplicate-case': ERROR,

		// https://eslint.org/docs/latest/rules/no-empty
		// Recommended default is enabled to error on empty block statements,
		// however they are useful for clarity
		'no-empty': IGNORE,

		// https://eslint.org/docs/latest/rules/no-empty-character-class
		// Recommended default is enabled to error on empty [] in regular expressions as they cause unexpected behaviour
		// 'no-empty-character-class': ERROR,

		// https://eslint.org/docs/latest/rules/no-empty-pattern
		// Recommended default is enabled to error
		// 'no-empty-pattern': ERROR,

		// https://eslint.org/docs/latest/rules/no-ex-assign
		// Recommended default is enabled to error on overwriting the the exception argument in a catch statement as it can cause memory leaks in some browsers
		// 'no-ex-assign': ERROR,

		// https://eslint.org/docs/latest/rules/no-extra-boolean-cast
		// Recommended default is enabled to error on superfluous boolean casts, they offer no value
		// 'no-extra-boolean-cast': ERROR,

		// https://eslint.org/docs/latest/rules/no-fallthrough
		// Recommended default is enabled to error
		// Don't allow switch case statements to follow through, use continue keyword instead
		// 'no-fallthrough': ERROR,

		// https://eslint.org/docs/latest/rules/no-func-assign
		// Recommended default is enabled to error
		// 'no-func-assign': ERROR,

		// https://eslint.org/docs/latest/rules/no-global-assign
		// Recommended default is enabled to error
		// 'no-global-assign': ERROR,

		// https://eslint.org/docs/latest/rules/no-invalid-regexp
		// Recommended default is enabled to error
		// 'no-invalid-regexp': ERROR,

		// https://eslint.org/docs/latest/rules/no-irregular-whitespace
		// Recommended default is enabled to error
		// 'no-irregular-whitespace': ERROR,

		// https://eslint.org/docs/latest/rules/no-new-native-nonconstructor
		// Recommended default is enabled to error
		// 'no-new-native-nonconstructor': ERROR,

		// https://eslint.org/docs/latest/rules/no-obj-calls
		// Recommended default is enabled to error
		// 'no-obj-calls': ERROR,

		// https://eslint.org/docs/latest/rules/no-octal
		// Recommended default is enabled to error
		// We never use this, it seems silly to allow this
		// 'no-octal': ERROR,

		// https://eslint.org/docs/latest/rules/no-prototype-builtins
		// Recommended default is enabled to error
		// however, not enough justification to change our existing use
		'no-prototype-builtins': IGNORE,

		// https://eslint.org/docs/latest/rules/no-redeclare
		// Recommended default is enabled to error
		// We never use this, it seems silly to allow this
		// 'no-redeclare': ERROR,

		// https://eslint.org/docs/latest/rules/no-regex-spaces
		// Recommended default is enabled to error
		// 'no-regex-spaces': ERROR,

		// https://eslint.org/docs/latest/rules/no-self-assign
		// Recommended default is enabled to error
		// 'no-self-assign': ERROR,

		// https://eslint.org/docs/latest/rules/no-shadow-restricted-names
		// Recommended default is enabled to error
		// We never use this, it seems silly to allow this
		// 'no-shadow-restricted-names': ERROR,

		// https://eslint.org/docs/latest/rules/no-sparse-arrays
		// Recommended default is enabled to error
		// 'no-sparse-arrays': ERROR,

		// https://eslint.org/docs/latest/rules/no-this-before-super
		// Recommended default is enabled to error
		// Makes sense as otherwise runtime error will occur
		// 'no-this-before-super': ERROR,

		// https://eslint.org/docs/latest/rules/no-undef
		// Recommended default is enabled to error
		// 'no-undef': ERROR,

		// https://eslint.org/docs/latest/rules/no-unexpected-multiline
		// Recommended default is enabled to error
		// Prettier overrides it
		// 'no-unexpected-multiline': ERROR,

		// https://eslint.org/docs/latest/rules/no-unreachable
		// Recommended default is enabled to error
		// 'no-unreachable': ERROR,

		// https://eslint.org/docs/latest/rules/no-unsafe-finally
		// Recommended default is enabled to error
		// 'no-unsafe-finally': ERROR,

		// https://eslint.org/docs/latest/rules/no-unsafe-negation
		// Recommended default is enabled to error
		// 'no-unsafe-negation': ERROR,

		// https://eslint.org/docs/latest/rules/no-unused-labels
		// Recommended default is enabled to error
		// 'no-unused-labels': ERROR,

		// https://eslint.org/docs/latest/rules/no-useless-escape
		// Recommended default is enabled to error
		// 'no-useless-escape': ERROR,

		// https://eslint.org/docs/latest/rules/no-with
		// Recommended default is enabled to error
		// We never use this, it seems silly to allow this
		// 'no-with': ERROR,

		// https://eslint.org/docs/latest/rules/require-yield
		// Recommended default is enabled to error
		// 'require-yield': ERROR,

		// https://eslint.org/docs/latest/rules/use-isnan
		// Recommended default is enabled to error
		// 'use-isnan': ERROR,

		// https://eslint.org/docs/latest/rules/valid-typeof
		// Recommended default is enabled to error
		// 'valid-typeof': ERROR,

		// ====================================================================
		// Stylistic (Prettier)
		// These rules are now handled by Prettier
		// https://github.com/prettier/eslint-config-prettier/blob/main/index.js

		// The following rules can be used in some cases with Prettier
		// These are special rules that Prettier marks with `0` instead of `"off"`

		// https://eslint.org/docs/latest/rules/curly
		// Always require curly braces unless the statement is all on a single line
		// This rule can work with Prettier in some cases
		// curly: [ERROR, 'multi-line'],

		// The rest are rules that you never need to enable when using Prettier

		// https://eslint.org/docs/latest/rules/array-bracket-spacing
		// https://eslint.style/rules/array-bracket-spacing
		// We don't use spaces with brackets
		// '@stylistic/array-bracket-spacing': [ERROR, 'never'],

		// https://eslint.org/docs/latest/rules/arrow-parens
		// https://eslint.style/rules/arrow-parens
		// We do this, no reason why, just what we do
		// '@stylistic/arrow-parens': [ERROR, 'always'],

		// https://eslint.org/docs/latest/rules/arrow-spacing
		// https://eslint.style/rules/arrow-spacing
		// Require consistent spacing for arrow functions
		// '@stylistic/arrow-spacing': ERROR,

		// https://eslint.org/docs/latest/rules/block-spacing
		// https://eslint.style/rules/block-spacing
		// Disallow or enforce spaces inside of single line blocks
		// '@stylistic/block-spacing': [ERROR, 'always'],

		// https://eslint.org/docs/latest/rules/brace-style
		// https://eslint.style/rules/brace-style
		// Opening brace on same line, closing brace on its own line, except when statement is a single line
		// '@stylistic/brace-style': [ERROR, 'stroustrup', { allowSingleLine: true }],

		// https://eslint.org/docs/latest/rules/comma-dangle
		// https://eslint.style/rules/comma-dangle
		// ES6 supports dangling commas
		// '@stylistic/comma-dangle': [ERROR, 'never'],

		// https://eslint.org/docs/latest/rules/comma-spacing
		// https://eslint.style/rules/comma-spacing
		// Require a comma after always
		// '@stylistic/comma-spacing': [ERROR, { before: false, after: true }],

		// https://eslint.org/docs/latest/rules/comma-style
		// https://eslint.style/rules/comma-style
		// Commas go last, we have tooling to detect if we forget a comma
		// '@stylistic/comma-style': [ERROR, 'last'],

		// https://eslint.org/docs/latest/rules/computed-property-spacing
		// https://eslint.style/rules/computed-property-spacing
		// Require or disallow padding inside computed properties
		// '@stylistic/computed-property-spacing': [ERROR, 'never'],

		// https://eslint.org/docs/latest/rules/dot-location
		// https://eslint.style/rules/dot-location
		// Dots should be on the newlines
		// chainableThingy
		//   .doSomething()
		//   .doSomethingElse()
		// '@stylistic/dot-location': [ERROR, 'property'],

		// https://eslint.org/docs/latest/rules/eol-last
		// https://eslint.style/rules/eol-last
		// Enable to make UNIX people's lives easier
		// '@stylistic/eol-last': ERROR,

		// https://eslint.org/docs/latest/rules/func-call-spacing
		// https://eslint.style/rules/function-call-spacing
		// We never use this, it seems silly to allow this
		// '@stylistic/function-call-spacing': [ERROR, 'never'],

		// https://eslint.org/docs/latest/rules/generator-star-spacing
		// https://eslint.style/rules/generator-star-spacing
		// Seems the most consistent location for it
		// '@stylistic/generator-star-spacing': [ERROR, 'before'],

		// https://eslint.org/docs/latest/rules/indent
		// https://eslint.style/rules/indent
		// Use tabs and indent case blocks
		// '@stylistic/indent': [
		// 	ERROR,
		// 	'tab',
		// 	{
		// 		SwitchCase: 1,
		// 		VariableDeclarator: 0,
		// 		outerIIFEBody: 1,
		// 		MemberExpression: 1,
		// 		FunctionDeclaration: {
		// 			body: 1,
		// 			parameters: 0
		// 		},
		// 		FunctionExpression: {
		// 			body: 1,
		// 			parameters: 0
		// 		}
		// 	}
		// ],

		// https://eslint.org/docs/latest/rules/jsx-quotes
		// https://eslint.style/rules/jsx-quotes
		// Prefer double quotes for JSX properties: <a b="c" />, <a b='"' />
		// '@stylistic/jsx-quotes': [ERROR, 'prefer-double'],

		// https://eslint.org/docs/latest/rules/key-spacing
		// https://eslint.style/rules/key-spacing
		// Space after the colon
		// '@stylistic/key-spacing': [
		// 	ERROR,
		// 	{
		// 		beforeColon: false,
		// 		afterColon: true
		// 	}
		// ],

		// https://eslint.org/docs/latest/rules/keyword-spacing
		// https://eslint.style/rules/keyword-spacing
		// Always force a space before and after a keyword
		// '@stylistic/keyword-spacing': [ERROR],

		// https://eslint.org/docs/latest/rules/linebreak-style
		// https://eslint.style/rules/linebreak-style
		// Enforce unix line breaks
		// '@stylistic/linebreak-style': [ERROR, 'unix'],

		// https://eslint.org/docs/latest/rules/lines-around-comment
		// https://eslint.style/rules/lines-around-comment
		// Enforce new lines before block comments
		// '@stylistic/lines-around-comment': [
		// 	ERROR,
		// 	{
		// 		beforeBlockComment: true,
		// 		allowBlockStart: true
		// 	}
		// ],

		// https://eslint.org/docs/latest/rules/max-len
		// https://eslint.style/rules/max-len
		// We use soft wrap
		// '@stylistic/max-len': IGNORE,

		// https://eslint.org/docs/latest/rules/new-parens
		// https://eslint.style/rules/new-parens
		// Always use parens when instantiating a class
		// '@stylistic/new-parens': ERROR,

		// https://eslint.org/docs/latest/rules/no-confusing-arrow
		// https://eslint.style/rules/no-confusing-arrow
		// Makes sense
		// '@stylistic/no-confusing-arrow': ERROR,

		// https://eslint.org/docs/latest/rules/no-mixed-operators
		// https://eslint.style/rules/no-mixed-operators
		// Seems sensible, let's see how we go with this
		// '@stylistic/no-mixed-operators': ERROR,

		// https://eslint.org/docs/latest/rules/no-tabs
		// https://eslint.style/rules/no-tabs
		// We use tabs
		// '@stylistic/no-tabs': IGNORE,

		// https://eslint.org/docs/latest/rules/object-curly-spacing
		// https://eslint.style/rules/object-curly-spacing
		// Desirable, but too many edge cases it turns out where it is actually preferred
		// '@stylistic/object-curly-spacing': IGNORE,

		// https://eslint.org/docs/latest/rules/quote-props
		// https://eslint.style/rules/quote-props
		// Seems like a good idea to error about this
		// was broken before, but lets give a go again
		// '@stylistic/quote-props': [ERROR, 'consistent-as-needed'],

		// https://eslint.org/docs/latest/rules/rest-spread-spacing
		// https://eslint.style/rules/rest-spread-spacing
		// Makes sense
		// '@stylistic/rest-spread-spacing': [ERROR, 'never'],

		// https://eslint.org/docs/latest/rules/semi
		// https://eslint.style/rules/semi
		// Never use semicolons
		// '@stylistic/semi': [ERROR, 'never'],

		// https://eslint.org/docs/latest/rules/semi-spacing
		// https://eslint.style/rules/semi-spacing
		// If semi's are used, then add spacing after
		// '@stylistic/semi-spacing': [ERROR, { before: false, after: true }],

		// https://eslint.org/docs/latest/rules/space-before-blocks
		// https://eslint.style/rules/space-before-blocks
		// Always force a space before a {
		// '@stylistic/space-before-blocks': [ERROR, 'always'],

		// https://eslint.org/docs/latest/rules/space-before-function-paren
		// https://eslint.style/rules/space-before-function-paren
		// function () {, get blah () {
		// '@stylistic/space-before-function-paren': [ERROR, 'always'],

		// https://eslint.org/docs/latest/rules/space-infix-ops
		// https://eslint.style/rules/space-infix-ops
		// We use this
		// '@stylistic/space-infix-ops': ERROR,

		// https://eslint.org/docs/latest/rules/space-unary-ops
		// https://eslint.style/rules/space-unary-ops
		// We use this
		// '@stylistic/space-unary-ops': ERROR,

		// https://eslint.org/docs/latest/rules/template-curly-spacing
		// https://eslint.style/rules/template-curly-spacing
		// Makes sense
		// '@stylistic/template-curly-spacing': [ERROR, 'never'],

		// https://eslint.org/docs/latest/rules/wrap-iife
		// https://eslint.style/rules/wrap-iife
		// Wrap instant called functions in parenthesis for clearer intent
		// '@stylistic/wrap-iife': ERROR,

		// https://eslint.org/docs/latest/rules/wrap-regex
		// https://eslint.style/rules/wrap-regex
		// We do this, seems to work well
		// '@stylistic/wrap-regex': ERROR,

		// https://eslint.org/docs/latest/rules/yield-star-spacing
		// https://eslint.style/rules/yield-star-spacing
		// Our preference
		// '@stylistic/yield-star-spacing': [ERROR, 'both'],

		// ====================================================================
		// Stylistic (Deprecated)
		// These rules are NOT handled by Prettier are now handled by ESLint Stylistic
		// https://eslint.style/rules#rules
		// https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts

		// https://eslint.org/docs/latest/rules/line-comment-position
		// https://eslint.style/rules/line-comment-position
		// we use both
		// '@stylistic/line-comment-position': IGNORE,

		// https://eslint.org/docs/latest/rules/lines-around-directive
		// https://eslint.style/rules/padding-line-between-statements
		// Enforce directives with no line above but a line below
		// '@stylistic/padding-line-between-statements': [
		// 	ERROR,
		// 	{
		// 		before: 'never',
		// 		after: 'always'
		// 	}
		// ],

		// https://eslint.org/docs/latest/rules/max-statements-per-line
		// https://eslint.style/rules/max-statements-per-line
		// Let's give this a go and see what is appropriate for our usage
		// '@stylistic/max-statements-per-line': [WARN, { max: 1 }],

		// https://eslint.org/docs/latest/rules/multiline-ternary
		// https://eslint.style/rules/multiline-ternary
		// Current options are not useful
		// '@stylistic/multiline-ternary': IGNORE,

		// https://eslint.org/docs/latest/rules/newline-per-chained-call
		// https://eslint.style/rules/newline-per-chained-call
		// Let the author decide
		// enforce newline after each call when chaining the calls
		// '@stylistic/newline-per-chained-call': IGNORE,

		// https://eslint.org/docs/latest/rules/no-floating-decimal
		// https://eslint.style/rules/no-floating-decimal
		// Use zero when doing decimals, otherwise it is confusing
		// '@stylistic/no-floating-decimal': ERROR,

		// https://eslint.org/docs/latest/rules/no-multi-spaces
		// https://eslint.style/rules/no-multi-spaces
		// We like multi spaces for clarity
		// E.g. We like
		// if ( blah )  return foo
		// Instead of:
		// if ( blah ) return foo
		// However, eslint does not support this, so ignore.
		// '@stylistic/no-multi-spaces': IGNORE,

		// https://eslint.org/docs/latest/rules/no-multiple-empty-lines
		// https://eslint.style/rules/no-multiple-empty-lines
		// We use multiple empty lines for styling
		// '@stylistic/no-multiple-empty-lines': IGNORE,

		// https://eslint.org/docs/latest/rules/no-trailing-spaces
		// https://eslint.style/rules/no-trailing-spaces
		// Disallow trailing spaces
		// '@stylistic/no-trailing-spaces': ERROR,

		// https://eslint.org/docs/latest/rules/no-whitespace-before-property
		// https://eslint.style/rules/no-whitespace-before-property
		// Seems sensible
		// '@stylistic/no-whitespace-before-property': ERROR,

		// https://eslint.org/docs/latest/rules/object-curly-newline
		// https://eslint.style/rules/object-curly-newline
		// Object indentation should be consistent within the object
		// Ignore until https://github.com/eslint/eslint/issues/7434 is done
		// '@stylistic/object-curly-newline': [IGNORE, { multiline: true }],

		// https://eslint.org/docs/latest/rules/one-var-declaration-per-line
		// https://eslint.style/rules/one-var-declaration-per-line
		// '@stylistic/one-var-declaration-per-line': IGNORE,

		// https://eslint.org/docs/latest/rules/operator-linebreak
		// https://eslint.style/rules/operator-linebreak
		// Should be before, but not with =, *=, /=, += lines
		// However, eslint isn't that specific, so ignore
		// '@stylistic/operator-linebreak': IGNORE,

		// https://eslint.org/docs/latest/rules/padded-blocks
		// https://eslint.style/rules/padded-blocks
		// This rule doesn't appear to work correctly
		// '@stylistic/padded-blocks': IGNORE,

		// https://eslint.org/docs/latest/rules/space-in-parens
		// https://eslint.style/rules/space-in-parens
		// This is for spacing between (), so doSomething( WARN, ERROR, 3 ) or if ( WARN === 3 )
		// which we want for ifs, but don't want for calls
		// '@stylistic/space-in-parens': IGNORE,

		// https://eslint.org/docs/latest/rules/spaced-comment
		// https://eslint.style/rules/spaced-comment
		// We use this
		// '@stylistic/spaced-line-comment': ERROR,
		// '@stylistic/spaced-comment': [ERROR, 'always', { markers: ['/'] }],

		// ====================================================================
		// Bevry's Coding Conventions & Best Practices (Conflicts)
		// These rules conflict with plugins

		// Plugins that don't conflict:
		// https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
		// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/index.js#L46

		// --------------------------------------------------------------------
		// esplint-plugin-n
		// https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/all-rules.js

		// https://eslint.org/docs/latest/rules/callback-return
		// https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/callback-return.md
		// Seems to difficult to enforce
		'callback-return': IGNORE,

		// https://eslint.org/docs/latest/rules/global-require
		// https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/global-require.md
		// We use require where it is appropriate to use it
		'global-require': IGNORE,

		// https://eslint.org/docs/latest/rules/no-process-env
		// https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-env.md
		// We use process.env wisely
		'no-process-env': IGNORE,

		// https://eslint.org/docs/latest/rules/no-process-exit
		// https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-exit.md
		// We know what we are doing
		'no-process-exit': IGNORE,

		// https://eslint.org/docs/latest/rules/no-restricted-imports
		// https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-restricted-import.md
		// No need to disallow any imports
		'no-restricted-imports': IGNORE,

		// --------------------------------------------------------------------
		// typescript-eslint
		// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslintrc/strict.ts

		// https://eslint.org/docs/latest/rules/no-array-constructor
		// Don't use the array constructor when it is not needed
		// 'no-array-constructor': ERROR,

		// https://eslint.org/docs/latest/rules/no-unused-expressions
		// 'no-unused-expressions': ERROR,

		// https://eslint.org/docs/latest/rules/no-unused-vars
		// Recommended default is enabled to error
		// however it isn't enough to error over, just warn us when we don't use something
		// 'no-unused-vars': WARN,

		// ====================================================================
		// Bevry's Coding Conventions & Best Practices
		// All of these should have be rules which there is no recommended default from ESLint core or plugins, if there are, then they should go into their own section
		// Note that you should not comment out IGNORES as ESLint may default to values that are not simply ignore

		// https://eslint.org/docs/latest/rules/accessor-pairs
		// Often we only need one, setting both doesn't make sense
		// Enforces getter/setter pairs in objects
		'accessor-pairs': IGNORE,

		// https://eslint.org/docs/latest/rules/array-callback-return
		// Seems sensible
		// Enforces return statements in callbacks of array's methods
		'array-callback-return': ERROR,

		// https://eslint.org/docs/latest/rules/arrow-body-style
		// Sensible to create more informed and clear code
		'arrow-body-style': [ERROR, 'as-needed'],

		// https://eslint.org/docs/latest/rules/block-scoped-var
		// This rule seems buggy
		'block-scoped-var': IGNORE,

		// https://eslint.org/docs/latest/rules/camelcase
		// Use camel case
		camelcase: ERROR,

		// https://eslint.org/docs/latest/rules/class-methods-use-this
		// Seems interesting, lets give it a go
		'class-methods-use-this': WARN,

		// https://eslint.org/docs/latest/rules/complexity
		// Disable complexity checks, they are annoying and not that useful in detecting actual complexity
		complexity: IGNORE,

		// https://eslint.org/docs/latest/rules/consistent-return
		// We use blank returns for break statements and for returning void
		'consistent-return': IGNORE,

		// https://eslint.org/docs/latest/rules/consistent-this
		// Enabling this was incredibly annoying when doing layers of nesting
		'consistent-this': IGNORE,

		// https://eslint.org/docs/latest/rules/default-case
		// If we don't have a default cause, it probably means we should throw an error
		'default-case': ERROR,

		// https://eslint.org/docs/latest/rules/dot-notation
		// Use dot notation where possible
		'dot-notation': ERROR,

		// https://eslint.org/docs/latest/rules/eqeqeq
		// Unless you are doing == null, then force === to avoid truthy/falsey mistakes
		eqeqeq: [ERROR, 'allow-null'],

		// https://eslint.org/docs/latest/rules/func-name-matching
		// This rule is not currently useful
		'func-name-matching': IGNORE,

		// https://eslint.org/docs/latest/rules/func-names
		// We like anonymous functions
		'func-names': IGNORE,

		// https://eslint.org/docs/latest/rules/func-style
		// Prefer to define functions via variables
		'func-style': [WARN, 'declaration'],

		// https://eslint.org/docs/latest/rules/guard-for-in
		// Always use hasOwnProperty when doing for in
		'guard-for-in': ERROR,

		// https://eslint.org/docs/latest/rules/id-blacklist
		// Nothing we want to blacklist
		// blacklist certain identifiers to prevent them being used
		'id-blacklist': IGNORE,

		// https://eslint.org/docs/latest/rules/id-length
		// Sometimes short names are appropriate
		'id-length': IGNORE,

		// https://eslint.org/docs/latest/rules/id-match
		// Camel case handles this for us
		'id-match': IGNORE,

		// https://eslint.org/docs/latest/rules/init-declarations
		// We don't care
		'init-declarations': IGNORE,

		// https://eslint.org/docs/latest/rules/max-depth
		// Disabled to ensure consistency with complexity option
		'max-depth': IGNORE,

		// https://eslint.org/docs/latest/rules/max-lines
		// Perhaps in the future we can set this to 300 or so
		// but for now it is not useful for the things we write and maintain
		'max-lines': IGNORE,

		// https://eslint.org/docs/latest/rules/max-nested-callbacks
		// We are smart enough to know if this is bad or not
		'max-nested-callbacks': IGNORE,

		// https://eslint.org/docs/latest/rules/max-params
		// Sometimes we have no control over this for compat reasons, so just warn
		'max-params': [WARN, MAX_PARAMS],

		// https://eslint.org/docs/latest/rules/max-statements
		// We should be able to use whatever feels right
		'max-statements': IGNORE,

		// https://eslint.org/docs/latest/rules/new-cap
		// Constructors should be CamelCase
		'new-cap': ERROR,

		// https://eslint.org/docs/latest/rules/newline-after-var
		// Too difficult to enforce correctly as too many edge-cases
		// require or disallow an empty newline after variable declarations
		// 'newline-after-var': IGNORE,

		// https://eslint.org/docs/latest/rules/no-alert
		// Warn about alert statements in our code
		// Use one of the suggested alternatives instead
		// Reasoning is they could be mistaken for left over debugging statements
		'no-alert': WARN,

		// https://eslint.org/docs/latest/rules/no-bitwise
		// We never use bitwise, they are too clever
		'no-bitwise': ERROR,

		// https://eslint.org/docs/latest/rules/no-caller
		// They are very slow
		'no-caller': ERROR,

		// https://eslint.org/docs/latest/rules/no-catch-shadow
		// Don't allow the catch method to shadow objects as browsers handle this differently
		// Update: We don't care for IE8
		'no-catch-shadow': IGNORE,

		// https://eslint.org/docs/latest/rules/no-console
		// but like debugger, we want to warn but not error
		'no-console': WARN,

		// https://eslint.org/docs/latest/rules/no-continue
		// We use continue
		'no-continue': IGNORE,

		// https://eslint.org/docs/latest/rules/no-div-regex
		// Seems like a good idea to error about this
		'no-div-regex': ERROR,

		// https://eslint.org/docs/latest/rules/no-duplicate-imports
		// Seems sensible, may be times when we want this
		'no-duplicate-imports': WARN,

		// https://eslint.org/docs/latest/rules/no-else-return
		// Returns in else statements offer code clarity, so disable this rule
		'no-else-return': IGNORE,

		// https://eslint.org/docs/latest/rules/no-empty-function
		// Up to developer sensibility
		// disallow use of empty functions
		'no-empty-function': IGNORE,

		// https://eslint.org/docs/latest/rules/no-eq-null
		// We know that == null is a null and undefined check
		'no-eq-null': IGNORE,

		// https://eslint.org/docs/latest/rules/no-eval
		// Eval is slow and unsafe, use vm's instead
		'no-eval': ERROR,

		// https://eslint.org/docs/latest/rules/no-extend-native
		// There is never a good reason for this
		'no-extend-native': ERROR,

		// https://eslint.org/docs/latest/rules/no-extra-bind
		// Don't allow useless binds
		'no-extra-bind': ERROR,

		// https://eslint.org/docs/latest/rules/no-extra-label
		// Seems sensible
		'no-extra-label': ERROR,

		// https://eslint.org/docs/latest/rules/no-extra-parens
		// superfluous parenthesis as they offer clarity in some cases, and have become standard in many styles
		// 'no-extra-parens': IGNORE,

		// https://eslint.org/docs/latest/rules/no-implicit-coercion
		// Cleverness is unclear
		'no-implicit-coercion': ERROR,

		// https://eslint.org/docs/latest/rules/no-implicit-globals
		// Seems sensible providing detection works correctly
		'no-implicit-globals': ERROR,

		// https://eslint.org/docs/latest/rules/no-implied-eval
		// A sneaky way to do evals
		'no-implied-eval': ERROR,

		// https://eslint.org/docs/latest/rules/no-inline-comments
		// We like inline comments
		'no-inline-comments': IGNORE,

		// https://eslint.org/docs/latest/rules/no-inner-declarations
		// seems like a good idea to error about this
		'no-inner-declarations': ERROR,

		// https://eslint.org/docs/latest/rules/no-invalid-this
		// This throws for a lot of senseless things, like Chainy functions
		// 'no-invalid-this': IGNORE,

		// https://eslint.org/docs/latest/rules/no-iterator
		// Use proper iterators instead
		'no-iterator': ERROR,

		// https://eslint.org/docs/latest/rules/no-label-var
		// We never use this, it seems silly to allow this
		'no-label-var': ERROR,

		// https://eslint.org/docs/latest/rules/no-labels
		// We never use this, it seems silly to allow this
		'no-labels': ERROR,

		// https://eslint.org/docs/latest/rules/no-lone-blocks
		// We never use this, it seems silly to allow this
		'no-lone-blocks': ERROR,

		// https://eslint.org/docs/latest/rules/no-lonely-if
		// The code could be optimised if this error occurs
		'no-lonely-if': ERROR,

		// https://eslint.org/docs/latest/rules/no-loop-func
		// Loop functions always cause problems, as the scope isn't clear through iterations
		'no-loop-func': ERROR,

		// https://eslint.org/docs/latest/rules/no-multi-str
		// Use ES6 template strings instead
		'no-multi-str': ERROR,

		// https://eslint.org/docs/latest/rules/no-negated-condition
		// Sometimes it is more understandable with a negated condition
		'no-negated-condition': IGNORE,

		// https://eslint.org/docs/latest/rules/no-nested-ternary
		// Sometimes these are useful
		'no-nested-ternary': IGNORE,

		// https://eslint.org/docs/latest/rules/no-new
		// We never use this, it seems silly to allow this
		'no-new': ERROR,

		// https://eslint.org/docs/latest/rules/no-new-func
		// We never use this, it seems silly to allow this
		'no-new-func': ERROR,

		// https://eslint.org/docs/latest/rules/no-new-wrappers
		// We never use this, it seems silly to allow this
		'no-new-wrappers': ERROR,

		// https://eslint.org/docs/latest/rules/no-octal-escape
		// We never use this, it seems silly to allow this
		'no-octal-escape': ERROR,

		// https://eslint.org/docs/latest/rules/no-param-reassign
		// We got to be pretty silly if we don't realise we are doing this
		// As such, take any usage as intentional and aware
		'no-param-reassign': IGNORE,

		// https://eslint.org/docs/latest/rules/no-plusplus
		// We use plus plus
		'no-plusplus': IGNORE,

		// https://eslint.org/docs/latest/rules/no-proto
		// We never use this, it seems silly to allow this
		'no-proto': ERROR,

		// https://eslint.org/docs/latest/rules/no-restricted-globals
		// No useful defaults
		'no-restricted-globals': IGNORE,

		// https://eslint.org/docs/latest/rules/no-restricted-modules
		// No need to disallow any modules
		'no-restricted-modules': IGNORE,

		// https://eslint.org/docs/latest/rules/no-restricted-properties
		// No defaults for this that are useful
		'no-restricted-properties': IGNORE,

		// https://eslint.org/docs/latest/rules/no-restricted-syntax
		// Handled by other rules
		'no-restricted-syntax': IGNORE,

		// https://eslint.org/docs/latest/rules/no-return-assign
		// We never use this, it seems silly to allow this
		'no-return-assign': ERROR,

		// https://eslint.org/docs/latest/rules/no-script-url
		// We never use this, it seems silly to allow this
		'no-script-url': ERROR,

		// https://eslint.org/docs/latest/rules/no-self-compare
		// We never use this, it seems silly to allow this
		'no-self-compare': ERROR,

		// https://eslint.org/docs/latest/rules/no-sequences
		// We never use this, it seems silly to allow this
		'no-sequences': ERROR,

		// https://eslint.org/docs/latest/rules/no-shadow
		// We use shadowing
		'no-shadow': IGNORE,

		// https://eslint.org/docs/latest/rules/no-template-curly-in-string
		// however its usage is likely a developer error, so warn to raise awareness of possible error, as sometimes it could be intended
		'no-template-curly-in-string': WARN,

		// https://eslint.org/docs/latest/rules/no-ternary
		// Sometimes ternaries are useful
		'no-ternary': IGNORE,

		// https://eslint.org/docs/latest/rules/no-throw-literal
		// We always want proper error objects as they have stack traces and respond to instanceof Error checks
		'no-throw-literal': ERROR,

		// https://eslint.org/docs/latest/rules/no-undef-init
		// Makes sense
		'no-undef-init': ERROR,

		// https://eslint.org/docs/latest/rules/no-undefined
		// typeof blah === 'undefined' should always be used
		'no-undefined': ERROR,

		// https://eslint.org/docs/latest/rules/no-underscore-dangle
		// Sometimes this is useful when avoiding shadowing
		'no-underscore-dangle': IGNORE,

		// https://eslint.org/docs/latest/rules/no-unmodified-loop-condition
		// Could be a getter, so warn
		'no-unmodified-loop-condition': WARN,

		// https://eslint.org/docs/latest/rules/no-unneeded-ternary
		// Sensible
		'no-unneeded-ternary': ERROR,

		// https://eslint.org/docs/latest/rules/no-use-before-define
		// Error when we try and use something before it is defined
		'no-use-before-define': ERROR,

		// https://eslint.org/docs/latest/rules/no-useless-call
		// Seems sensible
		'no-useless-call': ERROR,

		// https://eslint.org/docs/latest/rules/no-useless-computed-key
		// Seems sensible
		'no-useless-computed-key': ERROR,

		// https://eslint.org/docs/latest/rules/no-useless-concat
		// Seems sensible
		'no-useless-concat': ERROR,

		// https://eslint.org/docs/latest/rules/no-useless-constructor
		// Seems sensible
		'no-useless-constructor': ERROR,

		// https://eslint.org/docs/latest/rules/no-useless-rename
		// Seems sensible
		'no-useless-rename': ERROR,

		// https://eslint.org/docs/latest/rules/no-var
		// Of course
		// However, would be good to have this adjusted per environment
		'no-var': WARN,

		// https://eslint.org/docs/latest/rules/no-void
		// We never use this, it seems silly to allow this
		'no-void': ERROR,

		// https://eslint.org/docs/latest/rules/no-warning-comments
		// Warn about todos to raise their awareness
		'no-warning-comments': [
			WARN,
			{ terms: ['todo', 'fixme'], location: 'anywhere' },
		],

		// https://eslint.org/docs/latest/rules/object-shorthand
		// Enforce ES6 object shorthand
		'object-shorthand': ERROR,

		// https://eslint.org/docs/latest/rules/one-var
		// We like multiple var statements
		'one-var': IGNORE,

		// https://eslint.org/docs/latest/rules/operator-assignment
		// Force use of shorthands when available
		'operator-assignment': [ERROR, 'always'],

		// https://eslint.org/docs/latest/rules/prefer-arrow-callback
		// Better performance when running native
		// but horrible performance if not running native as could fallback to bind
		// https://travis-ci.org/bevry/es6-benchmarks
		'prefer-arrow-callback': IGNORE,

		// https://eslint.org/docs/latest/rules/prefer-const
		// Of course
		'prefer-const': ERROR,

		// https://eslint.org/docs/latest/rules/prefer-numeric-literals
		// Makes sense
		'prefer-numeric-literals': ERROR,

		// https://eslint.org/docs/latest/rules/prefer-reflect
		// Controversial change, but makes sense to move towards to reduce the risk of bad people overwriting apply and call
		// https://github.com/eslint/eslint/issues/2939
		// Ignoring because node does not yet support it, so we don't want to get the performance hit of using the compiled ES5 version
		'prefer-reflect': IGNORE,

		// https://eslint.org/docs/latest/rules/prefer-rest-params
		// Makes sense to enforce, exceptions should be opted out of on case by case
		'prefer-rest-params': ERROR,

		// https://eslint.org/docs/latest/rules/prefer-spread
		// Sure, why not
		'prefer-spread': ERROR,

		// https://eslint.org/docs/latest/rules/prefer-template
		// Too annoying to enforce
		'prefer-template': IGNORE,

		// https://eslint.org/docs/latest/rules/radix
		// Always specify a radix to avoid errors
		radix: ERROR,

		// https://eslint.org/docs/latest/rules/sort-imports
		// Importance makes more sense than alphabetical
		'sort-imports': IGNORE,

		// https://eslint.org/docs/latest/rules/sort-keys
		// Importance makes more sense than alphabetical
		'sort-keys': IGNORE,

		// https://eslint.org/docs/latest/rules/sort-vars
		// Importance makes more sense than alphabetical
		'sort-vars': IGNORE,

		// https://eslint.org/docs/latest/rules/strict
		// Ensure that use strict is specified to prevent the runtime error:
		// SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode
		strict: [ERROR, 'global'],

		// https://eslint.org/docs/latest/rules/symbol-description
		// Makes sense
		'symbol-description': ERROR,

		// https://eslint.org/docs/latest/rules/unicode-bom
		// When would we ever do this? Makes no sense
		'unicode-bom': [ERROR, 'never'],

		// https://eslint.org/docs/latest/rules/vars-on-top
		// We appreciate the clarity late defines offer
		'vars-on-top': IGNORE,

		// https://eslint.org/docs/latest/rules/yoda
		// Because we force === and never allow assignments in conditions
		// we have no need for yoda statements, so disable them
		yoda: [ERROR, 'never'],
	},
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
	'eslint-plugin-prettier' // deprecated: boundation calls prettier separately, as such we just use eslint-config-prettier to disable formatting conflicts
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
let ecmaVersion = new Date().getFullYear() - 1,
	sourceType = 'script',
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

// editions
if (pkg.editions) {
	const sourceEdition = pkg.editions[0]
	const editionTags = sourceEdition.tags || sourceEdition.syntaxes || []
	const ecmaTag =
		editionTags.find((tag) => tag.startsWith('es') && tag !== 'esnext') ||
		editionTags.includes('esnext')
			? `ES${ecmaVersion}`
			: ''
	if (ecmaTag) {
		ecmaVersion = Number(ecmaTag.substring(2))
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
		// commonjs is also supported
		sourceType = 'script'
	}
	if (editionTags.includes('react')) {
		react = true
	}
	if (editionTags.includes('babel')) {
		babel = true
	}
	if (editionTags.includes('jsx') || editionTags.includes('tsx')) {
		jsx = true
	}
	if (config.files.length === 0) {
		config.files.push(
			`${sourceEdition.directory || '.'}/**/*.{js,cjs,mjs,jsx,mjsx,ts,cts,mts,tsx,mtsx}`
		)
	}
} else if (config.files.length === 0) {
	config.files.push('**/*.{js,cjs,mjs,jsx,mjsx,ts,cts,mts,tsx,mtsx}')
}

// language
config.languageOptions.ecmaVersion = ecmaVersion
config.languageOptions.sourceType = sourceType
config.languageOptions.parserOptions.ecmaFeatures.jsx = jsx
if (ecmaVersion >= 2021) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.es2021,
	}
} else if (ecmaVersion >= 2020) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.es2020,
	}
} else if (ecmaVersion >= 2017) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.es2017,
	}
} else if (ecmaVersion >= 2015) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.es2015,
	}
} else if (ecmaVersion <= 5) {
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.es5,
	}
	config.rules['no-var'] = IGNORE
	config.rules['object-shorthand'] = [ERROR, 'never']
	config.rules['prefer-rest-params'] = IGNORE
	config.rules['prefer-spread'] = IGNORE
	config.rules['prefer-const'] = IGNORE
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
	if (typescript) {
		config.extends.push(eslintImport.flatConfigs.typescript)
	}
}

// node
if (node) {
	// https://github.com/eslint-community/eslint-plugin-n#-configs
	if (sourceType === 'module') {
		config.extends.push(eslintNode.configs['flat/recommended-module'])
	} else {
		config.extends.push(eslintNode.configs['flat/recommended-script'])
	}
	// these globals should be handeld by the plugin above, but add them anyway
	config.languageOptions.globals = {
		...config.languageOptions.globals,
		...globals.node,
		...globals.nodeBuiltin,
	}
	// https://github.com/eslint-community/eslint-plugin-n?tab=readme-ov-file#-rules
	// None of these should be set by the recommended configs we included above
	Object.assign(config.rules, {
		// https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/handle-callback-err.md
		// Force handling of callback errors
		'n/handle-callback-err': ERROR,

		// https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-new-require.md
		// Disallow error prone syntax
		'n/no-new-require': ERROR,

		// https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-mixed-requires.md
		// Seems like a good idea
		'n/no-mixed-requires': ERROR,

		// https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-path-concat.md
		// Always use path.join for windows support
		'n/no-path-concat': ERROR,

		// https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-sync.md
		// Sometimes sync methods are useful, so warn but don't error
		'n/no-sync': WARN,
	})
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
	config.extends.push(
		// https://typescript-eslint.io/users/configs#recommended
		// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslintrc/recommended.ts
		// eslintTypescript.configs.recommended

		// https://typescript-eslint.io/users/configs#strict
		// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslintrc/strict.ts
		eslintTypescript.configs.strict
		// ^ this matches typescript's strict mode which is what we use

		// eslintTypescript.configs.stylistic
		// ^ prettier already handles these

		// https://typescript-eslint.io/getting-started/typed-linting
		// ^ for type stripping, which we don't currently use, as such the typescript compiler will catch these, which is what we use
	)
	// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslintrc/recommended.ts
	Object.assign(config.rules, {
		// 'use strict' directive is invalid with typescript
		strict: IGNORE,
		// typescript will detect true errors here better than eslint can
		'no-use-before-define': IGNORE,
		// incompatible with typescript overloads
		'no-redeclare': IGNORE,
	})
} else {
	// jsdoc without typescript
}

//jsdoc
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

// user rules overrides
if (pkg.eslintConfig?.rules) {
	Object.assign(config.rules, pkg.eslintConfig.rules)
}

// ------------------------------------
// Export

export default config

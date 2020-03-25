// @ts-check
'use strict'

const { join } = require('path')

module.exports = {
	extends: [
		'eslint:recommended',
		join(__dirname, 'rules.js'),
		join(__dirname, 'adapt.js'),
	],
}

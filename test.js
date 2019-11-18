// @ts-check
'use strict'

const kava = require('kava')

kava.suite('eslint-config-bevry', function(suite, test) {
	const files = ['index', 'rules', 'adapt']
	files.forEach(function(file) {
		const path = `./${file}.js`
		test(path, function() {
			require(path)
		})
	})
})

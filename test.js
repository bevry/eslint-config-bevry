// @ts-check
'use strict'

const joe = require('joe')

joe.suite(function(suite, test) {
	const files = ['index', 'rules', 'adapt']
	files.forEach(function(file) {
		const path = `./${file}.js`
		test(path, function() {
			require(path)
		})
	})
})

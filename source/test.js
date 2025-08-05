import safeps from 'safeps'
import { cwd } from 'node:process'
import kava from 'kava'

kava.suite('eslint-config-bevry', function (suite, test) {
	test('npx eslint', function (done) {
		safeps.spawn(['npx', 'eslint'], { cwd: cwd(), stdio: 'inherit' }, done)
	})
})

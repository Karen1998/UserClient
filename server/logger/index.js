import { get } from 'stack-trace'
import { inspect } from 'util'
import { sep, relative } from 'path'
import { name as projectname } from '../package' // package.json -> project name

export default class Logger {
	constructor() {
		function generateLogFunction(level) {
			return function(message, meta) {
				let mes = this.module + ' -- '
				mes += level + ' -- '
				mes += message
				if (meta) mes += '  ' + inspect(meta) + ' '
				mes += '\n'

				this.write(mes)
			}
		};

		this.trace = get()[1]
		this.filename = this.trace.getFileName()
		this.module = projectname + sep + relative(__dirname + '/..', this.filename)
		this.streams = [process.stdout]
		this.log = generateLogFunction('Log')
		this.info = generateLogFunction('Info')
		this.error = generateLogFunction('Error')
		this.warn = generateLogFunction('Warning')
	}
	write(d) {
		this.streams.forEach((stream) => {
			stream.write(d)
		})
	}
}

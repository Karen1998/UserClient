import Logger from '../logger'
const logger = new Logger()

export default function(req, res, next) {
	let beginTime = Date.now()
	res.on('finish', () => {
		let d = Date.now()
		logger.log('Response time: ' + (d - beginTime), {
			url: req.url,
			time: (d - beginTime)
		})
	})
	next()
}

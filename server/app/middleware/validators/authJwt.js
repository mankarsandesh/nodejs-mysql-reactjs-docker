const jwt = require('jsonwebtoken')
const AWT_key = "sandesh_AAWT_key";
verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token']

	if (!token) {
		return res.status(403).send({
			message: 'No token provided!',
		})
	}

	jwt.verify(token, AWT_key, (err, decoded) => {
		console.log(AWT_key)
		console.log(token)
		console.log(err)
		if (err) {
			return res.status(401).send({
				message: 'Unauthorized!',
			})
		}
		req.userId = decoded.id
		next()
	})
}

module.exports = {
	verifyToken,
}

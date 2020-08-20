function makeCheckUsertypeMiddleware(usertype_id) {
    return function (req, res, next) {
        console.log(req.decodedJwt)
        if (req.decodedJwt.usertype && req.decodedJwt.usertype === usertype_id) {
            next();
        } else {
            res.status(403).json({ message: 'you do not have the power' });
        }
    }
}

module.exports = makeCheckUsertypeMiddleware;
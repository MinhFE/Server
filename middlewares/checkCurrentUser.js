const jwt = require('jsonwebtoken');

exports.checkCurrentUser = (req, res, next) => {
    const Authorization = req.header('authorization');

    if (!Authorization) {
        req.user = null;
        next();
    } else {
        const token = Authorization.replace('Bearer ', '');

        try {
            const { userId } = jwt.verify(token, process.env.APP_SECRET);

            req.user = { userId };
            next();
        } catch (error) {
            req.user = null;
            next();
        }
    }
};

import jwt from 'jsonwebtoken';
import Util from '../util/utils';

const util = new Util();

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRETE);
        req.userData = decoded;

        next();
    }catch(err) {
        util.setError(500, 'Authentication failed');
        util.send(res);
    }
}
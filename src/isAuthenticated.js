import jwt from 'jsonwebtoken'
import User from '../models/User'
import 'colors';
import asycnHandler from '../middlewares/asyncHandler';

// protect routes
export const isProtected = asycnHandler(
    async ({ req, res }) => {

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return false;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        return true;
    }
)
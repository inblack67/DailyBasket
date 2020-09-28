import jwt from 'jsonwebtoken'
import User from '../models/User'
import 'colors';
import asyncHandler from './asyncHandler';
import ErrorResponse from '../src/errorResponse';

// protect routes
export const protect = asyncHandler(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(new ErrorResponse('Not Authorized', 401));
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        next();

    } catch (err) {
        return next(new ErrorResponse('Not Authorized', 401));
    }
});
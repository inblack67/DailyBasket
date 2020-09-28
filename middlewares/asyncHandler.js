import ErrorResponse from '../src/errorResponse';

export default fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next))
        .catch(err => {

            let error = { ...err };
            error.message = err.message;

            if (err.name === 'CastError') {
                const message = `Resource not found`;
                error = new ErrorResponse(message, 404);
            }

            if (err.code === 11000) {
                const message = `Resource already exists`;
                error = new ErrorResponse(message, 400);
            }

            if (err.name === 'ValidationError') {
                const message = Object.values(err.errors).map(value => value.message);
                error = new ErrorResponse(message, 400);
            }

            throw new ErrorResponse(error.message || 'Server Error', error.statusCode || 500);
        })

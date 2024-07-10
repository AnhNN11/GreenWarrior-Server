class AppResponse {
    constructor(status, statusCode, message, data = null, result = null) {
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.result = result;
    }

    static success(res, result, data, message = 'Request successful') {
        return res
            .status(200)
            .json(new AppResponse('success', 200, message, data, result));
    }

    static fail(res, message, statusCode = 400) {
        return res
            .status(statusCode)
            .json(new AppResponse('fail', statusCode, message));
    }

    static error(res, message, statusCode = 500) {
        return res
            .status(statusCode)
            .json(new AppResponse('error', statusCode, message));
    }
}

export default AppResponse;

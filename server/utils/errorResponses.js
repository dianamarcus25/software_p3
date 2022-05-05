class ErrorResponses extends Error {
    constructor(message, status) {
        super(message);
        this.status = status
    }
}

module.exports = ErrorResponses;
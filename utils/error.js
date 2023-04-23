class ErrorGlobalHandler extends Error {}

const handleError = (err, req, res) => {

    res
        .status(err instanceof ErrorGlobalHandler ? 400 : 500)
        .render('error', {
            message: err instanceof ErrorGlobalHandler ? err.message : 'The server is currently undergoing maintenance. Please try again in 15 minutes. We apologize for any inconvenience caused.',
        });

    if (err instanceof 'NotFoundError') {
        res
            .status(404)
            .render('error', {
                message: "The object ID has not found"
            })
    }

};

module.exports ={
    handleError,
    ErrorGlobalHandler,
};
const showError = (req) => {
    return () => {
        let msg = req.session.manageError || [];
        //console.log("mens", msg.length)
        req.session.manageError = "";
        return msg
    }
}

function manageError(){
    return (req, res, next) => {
    req.flashMsg = dataError;
    res.locals.showError = showError(req);
    next();
    }
}

function dataError(data){
    this.session.manageError = data;
    console.log(data)
}

module.exports = manageError;
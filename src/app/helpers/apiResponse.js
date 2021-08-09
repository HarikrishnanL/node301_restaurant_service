exports.successResponse = (res,msg)=>{
    let data = {
        status:true,
        message:msg
    }
    console.log("data:",data)
    return res.status(200).json(data);
}

exports.successResponseWithData = (res,msg,data)=>{
    let resData = {
        status:true,
        message:msg,
        data:data
    }
    return res.status(200).json(resData);
}

exports.errorResponse = (res,msg)=>{
    let data = {
        status:false,
        msg,
    };
    return res.status(500).json(data);
}

exports.customErrorResponse = (res,msg,errorCode)=>{
    let data = {
        status:false,
        message:msg,
    };
    return res.status(errorCode).json(data);
}
exports.notFoundResponse = (res,msg)=>{
    let data = {
        status:false,
        message:msg
    }

    return res.status(404).json(data);
}

exports.validationErrorWithData = (res,msg,data) =>{
    let resData = {
        status:false,
        message :msg,
        data:data
    }

    return res.status(400).json(resData);
}

exports.unauthorizedResponse = (res,msg)=>{
    let data = {
        status:false,
        message:msg
    }
    return res.status(401).json(data)
}
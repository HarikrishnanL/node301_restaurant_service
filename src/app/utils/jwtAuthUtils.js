const jwt  = require("jsonwebtoken");

exports.sign = (payload,secret,options = null)=>{
    try{
        let encode = jwt.sign({payload:payload},secret,options);
        return encode;
    }catch(error){
        throw error;
    }
}

exports.decode = (verifyToken,secret)=>{
    try{
        let decode = jwt.verify(verifyToken,secret);
        if(decode.payload){
            return decode.payload;
        }else{
            throw new Error("Token expired");
        }
    }catch(error){
        throw error;
    }
}
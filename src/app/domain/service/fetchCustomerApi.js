const superagent = require("superagent");

exports.getCustomer = async (id,token)=>{
    try{
        let customer = await superagent.get(process.env.customerTestUrl +"customer/"+id).set('authToken',token);
        return customer.body.response;
    }catch(error){
        throw error;
    }
}
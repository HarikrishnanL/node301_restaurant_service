const JwtAuthUtils = require('../utils/jwtAuthUtils');
const FetchCustomer = require('../domain/service/fetchCustomerApi');
const customerCustomMessages = require('../domain/customMessages/customer')
const apiResponse = require('../helpers/apiResponse');

exports.sessionAuthValidator = async (req, res, next) => {
    try {
        let token = req.header('authToken');
        if (token) {
            let payload = JwtAuthUtils.decode(token, process.env.kJWTSecret);
            let customer = await FetchCustomer.getCustomer(payload.id,token);

            if (customer) {
                req.user = {
                    id: customer.id,
                    email: customer.email,
                    number: customer.phoneNumber
                }
                return next();
            } else {
                return apiResponse.notFoundResponse(res, customerCustomMessages.errorMessages.CUSTOMER_UNAUTHORIZED);
            }
        } else {
            return apiResponse.customErrorResponse(res, customerCustomMessages.errorMessages.AUTHTOKEN_REQUIRED, 401)
        }
    } catch (error) {
        throw error;
    }
}

exports.adminSessionAuthValidator = async (req, res, next) => {
    try {
        let token = req.header('authToken');
        if (token) {
            let payload = JwtAuthUtils.decode(token, process.env.kJWTSecret);
            let customer = await FetchCustomer.getCustomer(payload.id,token);
            if (customer && customer.role === 'Admin') {
                req.user = {
                    id: customer.id,
                    email: customer.email,
                    number: customer.phoneNumber
                }
                return next();

            } else {
                return apiResponse.notFoundResponse(res, customerCustomMessages.errorMessages.CUSTOMER_UNAUTHORIZED);
            }
        } else {
            return apiResponse.customErrorResponse(res, customerCustomMessages.errorMessages.AUTHTOKEN_REQUIRED, 401)
        }
    }
    catch (error) {
        throw error;
    }
}

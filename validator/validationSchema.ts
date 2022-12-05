import { Joi } from 'express-validation';

const validShema = {
    config: {
        context: true,
        statusCode: 422,
        keyByField: true,
    },
    signUpSchema: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .regex(/[a-zA-Z0-9]{3,30}/)
                .required(),
            lastName: Joi.string()  
                .required(),
            firstName: Joi.string()
                .required(),
            phone: Joi.number()
                .required()
        })
    },
    signInSchema: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .regex(/[a-zA-Z0-9]{3,30}/)
                .required()
        })
    }
}
export default validShema
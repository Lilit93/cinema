import { Joi } from 'express-validation';
import { join } from 'path';

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
    },
    addFilmSchema:{
        body: Joi.object({
            name: Joi.string()
                .required(),
            price: Joi.number()
                .required(),
            duration: Joi.number()
                .required(),
            language: Joi.string()
                .required(),
            categories: Joi.string()
                .required()
        })
    },
    updateFilmSchema: {
        params: Joi.object({
            id: Joi.number()
            .required()
        }),
        body: Joi.object({
            name: Joi.string()
                .required(),
            price: Joi.number()
                .required(),
            duration: Joi.number()
                .required(),
            language: Joi.string()
                .required(),
            categories: Joi.string()
                .required()
        })
    },
    deleteFilmSchema: {
        params:Joi.object({
            id: Joi.number()
            .required()
        })
    },
    addHallSchema: {
        body: Joi.object({
            name: Joi.string()
            .required()
        })
    },
    updateHallSchema: {
        params: Joi.object({
            id: Joi.number()
            .required()
        }),
        body: Joi.object({
            name: Joi.string()
            .required()
        })
    },
    deleteHallSchema: {
        params:Joi.object({
            id: Joi.number()
            .required()
        })
    },
    addChairSchema:{
        params: Joi.object({
            id: Joi.number()
             .required()
        }),
        body: Joi.object({
            row: Joi.number()
            .required(),
            chair: Joi.number()
            .required()
        })
    },
    findByIdSchema: {
        params: Joi.object({
            id: Joi.number()
            .required()
        }) 
    },
    deleteChairSchema: {
        params: Joi.object({
            id: Joi.number()
            .required()
        })
    },
    addReservationSchema: {
        body: Joi.object({
            timelineId: Joi.number()
            .required(),
            chairId: Joi.number()
            .required()
        })
    },
    updateReservationSchema: {
        params: Joi.object({
            id: Joi.number()
             .required()
        }),
        body: Joi.object({
            timelineId: Joi.number()
            .required(),
            chairId: Joi.number()
            .required()
        })
    },
    deleteReservationSchema: {
        params: Joi.object({
            id: Joi.number()
            .required()
        })
    },
    getReservationsByFilmIdSchema: {
        params: Joi.object({
            id: Joi.number()
            .required()
        })
    },
    addTimelineSchema: {
        body: Joi.object({
            hallId: Joi.number()
            .required(),
            filmId:Joi.number()
            .required(),
            started:Joi.date()
            .required(),
            ended:Joi.date()
            .required(),
        })
    },
    getTimelineByHallIdSchema: {
        params: Joi.object({
          hallId: Joi.number()
          .required()
        })
    },
    updateTimelineSchema: {
        params: Joi.object({
          id: Joi.number()
          .required()
        }),
        body: Joi.object({
            hallId: Joi.number()
            .required(),
            filmId:Joi.number()
            .required(),
            started:Joi.date()
            .required(),
            ended:Joi.date()
            .required(),
        })
    },
    deleteTimelineByIdSchema:{
        params: Joi.object({
            id: Joi.number()
            .required()
          })
    }
}
export default validShema
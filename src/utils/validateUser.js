import Joi from '@hapi/joi';

export default {
    signup: Joi.object().keys({
        firstName: Joi.string()
            .trim()
            .required()
            .regex(/^[A-Za-z_-]+$/)
            .min(3)
            .label(`First name is required, it must have at least 3 letters and must contain only letters, underscores(_) and hyphens (-)`),
        lastName: Joi.string()
            .trim()
            .required()
            .regex(/^[A-Za-z_.-]+$/)
            .min(3)
            .label(`Last name is required, it must have at least 3 letters and must contain only letters, underscores(_) and hyphens (-)`),
        email: Joi.string()
            .trim()
            .lowercase()
            .email()
            .required()
            .label('Email is required and should look like this : example@email.com!'),
        phoneNumber: Joi.string()
            .trim()
            .required()
            .label('Phone Number required'),
        password: Joi.string()
            .trim()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
            .required()
            .label('Password is required and must be at least 8 letters containing'
                + ' at least a number a Lowercase letter and an Uppercase letter'),
        username: Joi.string()
            .trim()
            .lowercase()
            .required()
            .regex(/^[a-zA-Z0-9_.-]+$/)
            .min(3)
            .label(`Username is required, it must have at least 3 letters and must contain only letters, numbers, underscores(_), hyphens (-) and points (.)`),
        confirmPassword: Joi.any()
            .required()
            .valid(Joi.ref('password'))
            .label('Password and Confirm Password do not match'),
        bio: Joi.string(),
        gender: Joi.string(),
    }),
    location: Joi.object().keys({
        locationName: Joi.string()
            .trim()
            .required()
            .regex(/^[a-zA-Z0-9_.-]+$/)
            .min(2)
            .label(`location name is required`),
        femalePopulation: Joi.number()
            .required()
            .integer()
            .greater(0)
            .label(`female population is required and should be a number greater than 0`),
        malePopulation: Joi.number()
            .required()
            .integer()
            .greater(0)
            .label(`male population is required and should be a number greater than 0`),
        under18Population: Joi.number()
            .required()
            .integer()
            .greater(0)
            .label(`under18 population is required and should be a number greater than 0`),
        over18Population: Joi.number()
            .required()
            .integer()
            .greater(0)
            .label(`over18 population is required and should be a number greater than 0`),
    })
}
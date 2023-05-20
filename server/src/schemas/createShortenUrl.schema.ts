import Joi from "joi";

const createShortenUrlSchema = Joi.object({
    destination: Joi.string().uri(),
});

export default createShortenUrlSchema;

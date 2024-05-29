import * as Joi from "joi";

export const JoinValidationShema = Joi.object({
  MONGO_DB: Joi.string().required(),
  PORT: Joi.number().default(3005),
  DEFAULT_LIMIT: Joi.number().default(6)
});
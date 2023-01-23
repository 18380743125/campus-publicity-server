import * as Joi from 'joi';

export const joiValidation = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain()),
  PORT: Joi.number().default(8000),
  DB_HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain()),
  DB_PORT: Joi.number().default(3306),
  DB_TYPE: Joi.string().valid('mysql', 'mongodb'),
  DB_DATABASE: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_SYNC: Joi.boolean(),
  LOG_ON: Joi.boolean(),
  LOG_LEVEL: Joi.string().default('info'),
});

import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const LocationSpec = {
  name: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
};

export const ReportSpec = {
  name: Joi.string().allow("").optional(),
  category: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
};

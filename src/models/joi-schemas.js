import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  isAdmin: Joi.bool().example(true).optional(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const LocationSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Malahide"),
    latitude: Joi.number().required().example("56.12"),
    longitude: Joi.number().required().example("-6.10"),
  })
  .label("Location");

export const LocationSpecPlus = LocationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");

export const ReportSpec = Joi.object()
  .keys({
    name: Joi.string().allow("").optional().example("Interference with the property"),
    category: Joi.string().required().example("Property Crimes"),
    description: Joi.string().allow("").optional().example("Burglary"),
    latitude: Joi.number().required().example("56.2"),
    longitude: Joi.number().required().example("-6.03"),
    locationid: IdSpec,
  })
  .label("Report");
export const ReportSpecPlus = ReportSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ReportPlus");

export const ReportArraySpec = Joi.array().items(ReportSpecPlus).label("ReportArray");

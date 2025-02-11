import Joi from 'joi';

export const userSchema = Joi.object({
  id: Joi.string().required(),
  uid: Joi.string().required(),
  displayName: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  photoURL: Joi.string().max(100).optional(),
});

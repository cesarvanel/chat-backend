import Joi from "joi";

const create = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  isAdmin: Joi.boolean().required(),
  userPwd: Joi.string().required(),
  userAvatar: Joi.string(),
  userToken: Joi.string().token().required(),
});


export default {create}
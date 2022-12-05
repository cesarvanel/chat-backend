import Joi from "joi";

const register = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  isAdmin: Joi.boolean(),
  userPwd: Joi.string().required(),
  userAvatar: Joi.string(),
  userToken: Joi.string().token()
});


const login = Joi.object({
  userEmail:Joi.string().required(),
  userPwd: Joi.string().required(),

})


export default {register , login}
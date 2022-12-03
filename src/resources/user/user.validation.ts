import Joi from "joi";

const register = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  userPwd: Joi.string().required(),
});


const login = Joi.object({
  userEmail:Joi.string().required(),
  userPwd: Joi.string().required(),

})


export default {register , login}
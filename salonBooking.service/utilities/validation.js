const Joi = require("joi");
//--------- validation Schema Using Joi ----------
const registerValidation = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    admin: Joi.boolean(),
  });

  return schema.validate(data);
};
//---------------------------------------------

const loginValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

//--------------- Exports ---------------------
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

//---------------------------------------------

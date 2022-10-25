require("dotenv").config();
const path = require("path");
const sendMail = require('../../../helper/send');
const validation = require('../../../helper/validation');
const messages = require('../../../helper/messages');
//---------------

module.exports.REQUIRED_FIELDS = ["name", "email", "subject", "message"];

//----------------

const returnResponse = (message)=>{
  return {
    message
  }
}

const validate = (args) => 
   new Promise(async (resolve, reject) => {
    try {
      await validation.fields(args);
    } catch (error) {
      reject(error);      
    }

    if(!validation.email(args.email)) 
       reject(messages.invalid_email)

    resolve();
  });

module.exports.main=async (args)=>{
	try {
    await validate(args)

    //send mail
    const response = await sendMail(args);
    return returnResponse(response);

	} catch (error) {
    return returnResponse(error);
	}

}
require("dotenv").config();
const path = require("path");
const sendMail = require('./helper/send');
const validation = require('./helper/validation');
const messages = require('./helper/messages');
const config = require('./helper/config');

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
    console.log({response})
    return returnResponse(response);

	} catch (error) {
    return returnResponse(error);
	}

}
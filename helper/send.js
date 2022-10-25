const nodeMail = require("nodemailer");
const messages = require('./messages');

module.exports=({name, email, subject, message}) =>
   new Promise(async (resolve, reject) => {
		const transporter = await nodeMail.createTransport({
				host: process.env.MAIL_HOST,
				port: process.env.MAIL_PORT,
				auth: {
					user: process.env.MAIL_USERNAME,
					pass: process.env.MAIL_PASSWORD
				},
		});

		const mailOption = {
			from: process.env.MAIL_FROM_NAME
				? `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`
				: process.env.MAIL_FROM_ADDRESS,
			to: email,
			subject: subject,
			html: message,
		};
		
		try {
			await transporter.sendMail(mailOption);
			 	resolve(messages.send);
		} catch (error) {
				reject(messages.not_send);
		}

	});
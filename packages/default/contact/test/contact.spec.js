const { main } = require("../contact");
const config = require('../helper/config');
const {expect} = require('chai');

describe("Test App", () => {
  	it("missing required keys",async () => {

			const args = {
				name: "test_name"
			}

			let response = await main({ name: "test_name" });

			const missingFields = config.REQUIRED_FIELDS.filter((field) => !args[field]);
			expect(response.message).equal(`Missing fields: ${missingFields.join(", ")}`);

  });

			it("invalid email",async () => {
				const args = {
					name: "test_name",
					email: "invalid_email",
					subject: "test_subject",
					message: "test_message"
				}
		
				let response = await main(args);
				expect(response.message).equal("Invalid Email");
			});

})
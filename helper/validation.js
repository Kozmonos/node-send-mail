module.exports.fields= (args) => {

  return new Promise((resolve, reject) => {
    const missingFields = this.REQUIRED_FIELDS.filter((field) => !args[field]);
    missingFields.length
      ? reject(`Missing fields: ${missingFields.join(", ")}`)
      : resolve()
  });

}

module.exports.email = (email) => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegexp.test(email);
}
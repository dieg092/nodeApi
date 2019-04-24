const re = /^(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;

export default (password, fields) => {
  let invalidPassword = true;

  if (re.test(password)) {
    invalidPassword = false;
  }

  if (invalidPassword) {
    return fields.ERROR && fields.ERROR.pass_requires;
  }

  return;
};

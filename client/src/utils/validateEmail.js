const re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (email, fields) => {
  let invalidEmail = true;

  if (re.test(email.trim())) {
    invalidEmail = false;
  }

  if (invalidEmail) {
    return fields.ERROR && fields.ERROR.email_invalid;
  }

  return;
};

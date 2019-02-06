const re = /^(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;

export default password => {
  let invalidPassword = true;

  if (re.test(password)) {
    invalidPassword = false;
  }

  if (invalidPassword) {
    return `La contraseña tiene que tener como mínimo: 8 carácteres, un número y una letra minúscula y una mayúscula`;
  }

  return;
};

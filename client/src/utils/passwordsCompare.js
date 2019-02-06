export default (password, password2) => {
  let diferentPass = true;

  if (password === password2) {
    diferentPass = false;
  }

  if (diferentPass) {
    return `Las contraseñas no coinciden`;
  }

  return;
};

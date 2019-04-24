export default (password, password2, fields) => {
  let diferentPass = true;

  if (password === password2) {
    diferentPass = false;
  }

  if (diferentPass) {
    return fields.ERROR && fields.ERROR.no_match_pass;
  }

  return;
};

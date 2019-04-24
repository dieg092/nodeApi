import CONSTANTS from '../utils/constants';

export default (path, locale) => {
  let lang = path;
  const isValidPath =  CONSTANTS.LANGS.search(path);

  if (isValidPath < 0) {
    const isValidLocale =  CONSTANTS.LANGS.search(locale);

    if (isValidLocale < 0) {
      lang = CONSTANTS.DEFAULT_LANG;
    } else {
      lang = locale;
    }
  }

  return lang;
};

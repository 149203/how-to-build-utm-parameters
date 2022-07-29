const checkIsValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const checkIsValidUtmValue = (text) => {
  // return true if text is not empty, is not longer than 50 characters, and only contains lowercase letters, numbers, dashes, and spaces (which will be converted to dashes later)
  return text.length > 0 && /^[a-z0-9\s-]+$/.test(text);
};

export { checkIsValidUrl, checkIsValidUtmValue };

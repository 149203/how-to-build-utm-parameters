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

const getUrlWithoutQueryString = (url) => {
  // turn url string into  a URL object
  const urlObj = new URL(url);
  // return only the url without the query string
  return urlObj.origin + urlObj.pathname;
};

const slugify = (text) => {
  // replace one or more spaces with a dash
  return text ? text.trim().replace(/\s+/g, "-") : "";
};

const getUtmUrlPayload = ({
  baseUrl,
  source,
  medium,
  campaign,
  content,
  term,
  id,
}) => {
  // FORMATTED FIELDS
  const baseUrlFormatted = getUrlWithoutQueryString(baseUrl);
  const sourceFormatted = slugify(source);
  const mediumFormatted = slugify(medium);
  const campaignFormatted = slugify(campaign);
  const contentFormatted = slugify(content);
  const termFormatted = term.replace(/\s+/g, "+");

  // OPTIONAL QUERY STRING PARAMETERS
  const termStr = term ? `&utm_term=${termFormatted}` : "";
  const idStr = id ? `&utm_id=${id}` : "";

  // PAYLOAD
  return {
    baseUrl: baseUrlFormatted,
    source: sourceFormatted,
    medium: mediumFormatted,
    campaign: campaignFormatted,
    content: contentFormatted,
    term: termFormatted,
    id: id,
    utmUrl: `${baseUrlFormatted}?utm_source=${sourceFormatted}&utm_medium=${mediumFormatted}&utm_campaign=${campaignFormatted}&utm_content=${contentFormatted}${termStr}${idStr}`,
  };

  // EXAMPLE
  // https://channelkey.com/?utm_source=google&utm_medium=search--p&utm_campaign=a50-plus&utm_content=choosy-moms-choose-jif&utm_term=super-creamy+peanut+butter
};

export { checkIsValidUrl, checkIsValidUtmValue, getUtmUrlPayload };

import { PREFERENCES_STORAGE_KEY, URLS_STORAGE_KEY } from 'core/constants';

export const getUrls = () => {
  const urls = localStorage.getItem(URLS_STORAGE_KEY);
  if (urls === null) return [];

  const urlsList = JSON.parse(urls);

  return !Array.isArray(urlsList) ? [] : urlsList;
};
export const getPreferences = () => {
  const preferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
  if (preferences === null) return {};

  const preferencesObject = JSON.parse(preferences);

  return typeof preferencesObject !== 'object' ||
    Array.isArray(preferencesObject)
    ? {}
    : preferencesObject;
};

export const getInitialContext = () => {
  return {
    requests: [],
    requestsMetaDataById: {},
    selectedRequest: undefined,
    settings: {
      urls: getUrls(),
      preferences: getPreferences(),
    },
  };
};

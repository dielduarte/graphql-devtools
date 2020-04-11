import { URLS_STORAGE_KEY } from 'core/constants';

export const getUrls = () => {
  const urls = localStorage.getItem(URLS_STORAGE_KEY);
  if (urls === null) return [];

  const urlsList = JSON.parse(urls);

  return !Array.isArray(urlsList) ? [] : urlsList;
};

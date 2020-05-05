import prettier from 'prettier/standalone';
import parserGraphql from 'prettier/parser-graphql';
import parserBabel from 'prettier/parser-babel.js';

export const copyToClipBoard = (link: string) => {
  const el = document.createElement('textarea');
  el.value = link;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const formatQuery = (query: string) => {
  return prettier.format(query, {
    parser: 'graphql',
    plugins: [parserGraphql],
  });
};

export const formatJson = (json: object) => {
  return prettier.format(JSON.stringify(json), {
    parser: 'json',
    plugins: [parserBabel],
  });
};

import prettier from 'prettier/standalone';
import parserGraphql from 'prettier/parser-graphql';

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

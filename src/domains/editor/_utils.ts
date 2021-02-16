import prettier from 'prettier/standalone';
import parserGraphql from 'prettier/parser-graphql';
import parserBabel from 'prettier/parser-babel.js';
import Prism from 'prismjs';
import memoize from 'fast-memoize';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-json';

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

export const highlightJson = memoize((values?: AnyObject) => {
  return Prism.highlight(
    formatJson(values || {}),
    Prism.languages.json,
    'json',
  );
});

export const highlightQuery = memoize((query?: string) => {
  return Prism.highlight(
    formatQuery(query || ''),
    Prism.languages.graphql,
    'graphql',
  );
});

# WIP

The frameworkless graphql devtools, focusing in a good DX

![devtool image example](docs/devtool.png)

# Development

All we have to do is install the dependencies:

```sh
$ yarn
```

To run our development server:

```sh
$ yarn start
```

To build the extension files:

```sh
$ yarn build
```

To load the extension in your Chrome browser:

1. Access `chrome://extensions`;
2. Enable the `Developer mode` (top-right corner);
3. Click on `Load unpacked`;
4. Select the `graphql-devtools/dist` dir.

Whenever you make a new change in the codebase, make sure you rebuild the files and reload your extension:

1. Rebuild using `yarn build`;
2. Access `chrome://extensions`;
3. Reload your extension by clickin on the card's "Reload" button.

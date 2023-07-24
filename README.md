# Store

[Cloud Commerce](https://github.com/ecomplus/cloud-commerce): the new Store template

## Getting started

[:us: First deployment and setup](./SETUP.md)

[:brazil: Primeiro deploy e configuração](./SETUP.pt-BR.md)

## Local development

```bash
npm i
```

> **Note**  
> Check VS Code (highly) recommend extensions in _store/.vscode/extensions.json_

### Storefront

```bash
npm run dev
```

It starts serving the site at http://localhost:3000/.

Edit your store source in _functions/ssr_:
- _src_: pages, components, styles and scripts sources;
- _content_: JSON and Markdown content (editable with git-based CMS);
- _public_: images and not-parsed static assets;

/// <reference path="../content/types" />
/// <reference types="astro/client" />
/// <reference types="vue/ref-macros" />
/// <reference types="@cloudcommerce/storefront/client" />
/// <reference types="@cloudcommerce/storefront/server" />
/// <reference types="@cloudcommerce/storefront/.auto-imports" />

/* eslint-disable import/newline-after-import */

declare module '*.vue' {
  import { type DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly BUILD_MINIMAL: boolean | undefined;
}

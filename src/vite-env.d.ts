/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASSET_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

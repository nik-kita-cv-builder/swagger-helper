/// <reference types="npm:vite/client" />

/// <reference types="npm:vite/client" />

interface ImportMetaEnv {
  // readonly VITE_GOOGLE_OAUTH2_CLIENT_ID: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

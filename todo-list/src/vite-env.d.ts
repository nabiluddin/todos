/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_API: string;
  readonly VITE_ENCRYPTION_KEY: string;
  readonly VITE_SESSION_DURATION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

interface  ImportMetaEnv {
    readonly VITE_APP_NAME : string;
    readonly VITE_APP_HOST : string;
    readonly NODE_ENV: string;
    readonly VITE_API_AUTH_BASE: string;
    readonly VITE_API_AUTH_REGISTER: string;
    readonly VITE_API_AUTH_LOGIN: string;
    readonly VITE_API_TASK_BASE: string;
    readonly VITE_API_TASK_OPERATIONS: string;
   // más variables de entorno...
 } interface ImportMeta {
    readonly env : ImportMetaEnv;
 }
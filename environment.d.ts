export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SALT: string;
    }
  }
}

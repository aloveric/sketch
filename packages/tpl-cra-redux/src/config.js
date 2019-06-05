/**
 * init dotenv
 *
 * .env: Default.
 * .env.local: Local overrides. This file is loaded for all environments except test.
 * .env.development, .env.test, .env.production: Environment-specific settings.
 * .env.development.local, .env.test.local, .env.production.local: Local overrides of environment-specific settings.
 *
 * Available settings
 *
 * APP_PORT=9527
 * APP_BASE_PATH=/v1
 * APP_JWT_PUBLIC_KEY=`a public key string`
 */

/**
 *
 * @param {string} name envrionment name
 * @param {object} opt option with { required, default }
 * @returns {*} value
 */

export default function env(name, init) {
  const key = `REACT_APP_${name.toUpperCase()}`;
  const buildtimeValue = process && process.env && process.env[key];
  const runtimeValue = window && window._36node && window._36node[key];

  const value = runtimeValue || buildtimeValue || init;
  if (value === undefined) {
    throw new Error(`environment ${name} is missing`);
  }

  return value;
}

export const STORE_BASE = env("STORE_BASE", "");
export const VERSION = env("VERSION");
export const TOKEN = env("TOKEN", "Some fake token");

/* eslint-disable */
console.log("STORE_BASE: ", STORE_BASE);
console.log("VERSION: ", VERSION);
/* eslint-disable */

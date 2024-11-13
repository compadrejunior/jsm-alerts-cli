import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  JSM_OPS_BASE_URL: string | undefined;
  CLOUD_ID: string | undefined;
  USER_EMAL: string | undefined;
  API_TOKEN: string | undefined;
}

export const config: Config = {
  JSM_OPS_BASE_URL: process.env.JSM_OPS_BASE_URL,
  CLOUD_ID: process.env.CLOUD_ID,
  USER_EMAL: process.env.USER_EMAL,
  API_TOKEN: process.env.API_TOKEN,
};

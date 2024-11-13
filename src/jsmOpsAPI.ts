import axios from 'axios';
import { config } from './config';

const options = {
  headers: {
    Authorization: `Basic ${Buffer.from(
      config.USER_EMAL + ':' + config.API_TOKEN
    ).toString('base64')}`,
    Accept: 'application/json',
  },
};

const createAlert = async (
  priority: string,
  message?: string,
  description?: string,
  note?: string,
  alias?: string,
  tags?: Array<string>
): Promise<null | any> => {
  const bodyData = {
    message,
    note,
    alias,
    tags,
    description,
    priority,
  };
  const response = await axios.post(
    `${config.JSM_OPS_BASE_URL}/${config.CLOUD_ID}/v1/alerts`,
    bodyData,
    options
  );
  const { data } = response;
  if (!data) return null;
  return data;
};

const getAlertsByAlias = async (alias: string): Promise<null | any> => {
  const response = await axios.get(
    `${config.JSM_OPS_BASE_URL}/${config.CLOUD_ID}/v1/alerts?query=alias:${alias}`,
    options
  );
  const { data } = response;
  if (!data) return null;
  return data;
};

const closeAlert = async (alertID: string): Promise<boolean> => {
  const response = await axios.post(
    `${config.JSM_OPS_BASE_URL}/${config.CLOUD_ID}/v1/alerts/${alertID}/close`,
    options
  );
  if (response.status !== 202) return false;
  return true;
};

export { createAlert, closeAlert, getAlertsByAlias };

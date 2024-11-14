import axios from 'axios';
import { config } from './config';

export interface Configuration {
  headers: {
    Authorization: string;
    Accept: 'application/json';
  };
}

export interface Alert {
  /** Sets the title for the alert */
  message: string;
  /** Define an alias for identify the alert */
  alias: string;
  /** Sets the detailed alert description */
  description?: string;
  /** Sets user comment notes */
  note?: string;
  /** Sets the alert tags for further filtering */
  tags?: Array<string>;
}

export class JSMAlertAPI {
  /**
   * Create an Alert into JSM Ops
   * @param alert Alert to be created
   * @returns the alert response data or null
   */
  static async createAlert(alert: Alert): Promise<null | any> {
    const response = await axios.post(
      `${config.JSM_OPS_BASE_URL}/jsm/ops/integration/v2/alerts`,
      alert,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `GenieKey ${config.GENIE_KEY}`,
        },
      }
    );
    console.log(response);
    const { data } = response;
    if (!data) return null;
    return data;
  }

  /**
   * Search alerts by the alias field
   * @param alias the alert alias
   * @returns the list of found alerts
   */
  static async getAlertsByAlias(alias: string): Promise<null | any> {
    const response = await axios.get(
      `${config.JSM_OPS_BASE_URL}/jsm/ops/api/${config.CLOUD_ID}/v1/alerts?query=alias:${alias}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${Buffer.from(
            config.USER_EMAL + ':' + config.API_TOKEN
          ).toString('base64')}`,
        },
      }
    );
    const { data } = response;
    if (!data) return null;
    return data;
  }

  /**
   * Close an alert in JSM Ops
   * @param alertID ID of the alert to be closed
   * @returns true|false determine the action success
   */
  static async closeAlert(alertID: string) {
    const response = await axios.post(
      `${config.JSM_OPS_BASE_URL}/jsm/ops/integration/v2/alerts/${alertID}/close`,
      {},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `GenieKey ${config.GENIE_KEY}`,
        },
      }
    );
    if (!response.data) return null;
    return response.data;
  }
}

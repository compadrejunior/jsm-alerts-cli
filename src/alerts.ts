import { OptionValues, program } from 'commander';
import chalk from 'chalk';
import { Alert, JSMAlertAPI } from './JSMAlertAPI';
import { AxiosError } from 'axios';

program
  .name('alert')
  .version('1.0.0')
  .description('Manage Alerts in JSM Operations');

program
  .command('create')
  .description('Create an alert')
  .argument('<message>', 'alert title')
  .argument('<alias>', 'alert alias')
  .option('-d, --description <description>', 'alert detailed description')
  .option('-n, --note <note>', 'user added note')
  .option('-t, --tags <tags>', 'list of tags')
  .action(async (message: string, alias: string, options: OptionValues) => {
    await createAlert(message, alias, options);
  });

program
  .command('close')
  .description('Close an alert by its alias')
  .argument('<alias>', 'alert alias')
  .action(async (alias: string) => {
    await closeAlert(alias);
  });

program.parse(process.argv);

async function createAlert(
  message: string,
  alias: string,
  options: OptionValues
) {
  try {
    const alert: Alert = {
      message,
      alias,
      ...(options.description && { description: options.description }),
      ...(options.note && { note: options.note }),
      ...(options.tags && { tags: options.tags }),
    };
    const response = await JSMAlertAPI.createAlert(alert);
    if (response) console.log(response);
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    if (error instanceof AxiosError)
      message = error.status + ' ' + error.message;
    console.error(chalk.red('Error: ') + message);
  }
}

async function closeAlert(alias: string) {
  try {
    const response = await JSMAlertAPI.getAlertsByAlias(alias);
    if (response && response.values && response.values.length > 0) {
      const { values } = response;
      values.map(async (alert: any) => {
        console.log(`ALERT: ${JSON.stringify(alert, null, 2)}`);
        const response = await JSMAlertAPI.closeAlert(alert.id);
        if (response)
          console.log(`Response:${JSON.stringify(response, null, 2)}`);
      });
    }
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    if (error instanceof AxiosError)
      message = error.status + ' ' + error.message;
    console.error(chalk.red('Error: ') + message);
  }
}

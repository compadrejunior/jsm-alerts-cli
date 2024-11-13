import { OptionValues, program } from 'commander';
import chalk from 'chalk';

program
  .name('alert')
  .version('1.0.0')
  .description('Manage Alerts in JSM Operations');

program
  .command('create')
  .description('Create an alert')
  .argument('<message>', 'alert title')
  .option('-d, --description <description>', 'alert detailed description')
  .option('-n, --note <note>', 'user added note')
  .option('-t, --tags <tags>', 'list of tags')
  .action((message: string, options: OptionValues) => {
    const title = chalk.bgGreen;
    const attibute = chalk.cyan;
    console.log('\n');
    console.log(title('  New alert  '));
    console.log(`${attibute('- message')}: ${message}`);
    console.log(`${attibute('- description')}: ${options.description}`);
    console.log(`${attibute('- note')}: ${options.note}`);
    console.log(`${attibute('- tags')}: ${options.tags}`);
  });

program.parse(process.argv);

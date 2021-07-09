import chalk from 'chalk';
import YeomanGenerator from 'yeoman-generator';
import yosay from 'yosay';
import { kebabCase } from 'lodash';
import { resolve, sep } from 'path';
import type { GeneratorOptions, Questions } from 'yeoman-generator';

import { isEmail, isURL } from './validator';

type Prompts = {
  projectName: string;
  description?: string;
  homepage?: string;
  repoURL?: string;
  authorName: string;
  authorEmail: string;
  authorURL?: string;
};

interface Options extends GeneratorOptions {
  destination?: string;
}

export default class extends YeomanGenerator<Options> {
  props: Prompts | undefined;

  constructor(args: string | string[], options: Options) {
    super(args, options);

    this.description = "Generate Latipun's project boilerplate ✨";

    this.argument('destination', {
      type: String,
      required: false,
      description: `\n\tThe folder to generate the project, absolute or relative to the current working directory.\n\tIf not provided, defaults to the current working directory.\n`,
    });
  }

  initializing() {
    const { destination } = this.options;

    if (destination) {
      const folderPath = resolve(this.destinationPath(), destination);

      this.destinationRoot(folderPath);
    }

    this.sourceRoot(resolve(__dirname, '..', '..', 'templates'));
  }

  async prompting() {
    this.log(
      yosay(
        `Welcome to the ${chalk.magenta(
          "Latipun's project boilerplate"
        )} generator!`
      )
    );

    const prompts: Questions<Prompts> = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        filter: kebabCase,
        default:
          (this.config.get('projectName') as string) ||
          process.cwd().split(sep).pop(),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description:',
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Project homepage:',
        validate: isURL,
      },
      {
        type: 'input',
        name: 'repoURL',
        message: 'Repository URL:',
        validate: isURL,
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name:',
        default: this.user.git.name(),
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author email:',
        default: this.user.git.email(),
        validate: isEmail,
      },
      {
        type: 'input',
        name: 'authorURL',
        message: 'Author URL:',
        validate: isURL,
      },
    ];

    const props = await this.prompt<Prompts>(prompts);

    this.props = props;
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }
}

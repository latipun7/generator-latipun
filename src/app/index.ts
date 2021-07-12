import chalk from 'chalk';
import YeomanGenerator from 'yeoman-generator';
import yosay from 'yosay';
import { chmodSync } from 'fs';
import { startCase, trim } from 'lodash';
import { resolve, sep } from 'path';
import type YoStorage from 'yeoman-generator/lib/util/storage';
import type { Except, JsonValue } from 'type-fest';
import type { GeneratorOptions } from 'yeoman-generator';

import { githubRepoNameFromURL, projectNameFilter } from '../utils';
import { isEmail, isEmoji, isURL } from './validator';

type Prompts = {
  projectName: string;
  projectEmoji?: string;
  projectTitle?: string;
  description?: string;
  homepage?: string;
  repoURL?: string;
  authorName?: string;
  authorEmail?: string;
  authorURL?: string;
  packager: 'yarn' | 'npm';
  deployable: boolean;
  publishable: boolean;
};

type GeneratorProps = Prompts & {
  githubUser?: string;
  githubRepo?: string;
};

interface Storage extends YoStorage {
  get(key: keyof Prompts): JsonValue | undefined;
}

interface Options extends GeneratorOptions {
  destination?: string;
}

export default class AppGenerator extends YeomanGenerator<Options> {
  override config!: Storage;

  props: GeneratorProps;

  constructor(args: string | string[], options: Options) {
    super(args, options);

    this.description = "Generate Latipun's project boilerplate ⚔️";

    this.argument('destination', {
      type: String,
      required: false,
      description: `\n\tThe folder to generate the project, absolute or relative to the current working directory.\n\tIf not provided, defaults to the current working directory.\n`,
    });

    this.props = Object.create(null) as GeneratorProps;
  }

  initializing() {
    const { destination } = this.options;

    if (destination) {
      const folderPath = resolve(this.destinationPath(), destination);

      this.destinationRoot(folderPath);
    }

    this.sourceRoot(resolve(__dirname, '..', '..', 'templates'));

    this.log(
      yosay(
        `Welcome to the ${chalk.magentaBright(
          "Latipun's project boilerplate"
        )} generator!`
      )
    );
  }

  async prompting() {
    const folderName = this.destinationPath().split(sep).pop();

    const answers = await this.prompt<Except<Prompts, 'publishable'>>([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: this.config.get('projectName') || folderName,
        filter: projectNameFilter,
      },
      {
        type: 'input',
        name: 'projectEmoji',
        message: 'Project icon:',
        default: this.config.get('projectEmoji'),
        filter: trim,
        validate: isEmoji,
      },
      {
        type: 'input',
        name: 'projectTitle',
        message: 'Project title:',
        default: this.config.get('projectTitle') || startCase(folderName),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: this.config.get('description'),
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Project homepage:',
        default: this.config.get('homepage'),
        validate: isURL,
      },
      {
        type: 'input',
        name: 'repoURL',
        message: 'Repository URL:',
        default: this.config.get('repoURL'),
        validate: isURL,
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name:',
        default: this.config.get('authorName') || this.user.git.name(),
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author email:',
        default: this.config.get('authorEmail') || this.user.git.email(),
        validate: isEmail,
      },
      {
        type: 'input',
        name: 'authorURL',
        message: 'Author URL:',
        default: this.config.get('authorURL'),
        validate: isURL,
      },
      {
        type: 'list',
        name: 'packager',
        message: 'What package manager would you like to use?',
        default: this.config.get('packager') || 'yarn',
        choices: [
          { name: 'Yarn', value: 'yarn' },
          { name: 'NPM', value: 'npm' },
        ],
      },
      {
        type: 'confirm',
        name: 'deployable',
        message: 'Is this project would be deployed to github pages?',
        default: this.config.get('deployable') || true,
      },
    ]);

    const answerPublish = await this.prompt<Pick<Prompts, 'publishable'>>({
      type: 'confirm',
      name: 'publishable',
      message: 'Is this project would be published to NPM?',
      default: this.config.get('publishable') || !answers.deployable,
    });

    this.props = { ...answers, ...answerPublish };
    this.props.githubUser = await this.user.github.username();
    this.props.githubRepo = githubRepoNameFromURL(answers.repoURL);
  }

  configuring() {
    this.env.options.nodePackageManager = this.props.packager;
    this.config.merge(this.props);

    this.fs.copyTpl(
      this.templatePath('initial/.github/workflows/ci-cd.yml'),
      this.destinationPath(
        `.github/workflows/${this.props.deployable ? 'ci-cd.yml' : 'ci.yml'}`
      ),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('initial/.github/codeowners'),
      this.destinationPath('.github/codeowners'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('initial/.github/dependabot.yml'),
      this.destinationPath('.github/dependabot.yml'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('initial/.vscode/settings'),
      this.destinationPath('.vscode/settings.json'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('initial/license'),
      this.destinationPath('license'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('initial/package'),
      this.destinationPath('package.json'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('initial/readme'),
      this.destinationPath('readme.md'),
      this.props
    );

    this.fs.copy(
      this.templatePath('initial/.husky/pre-commit'),
      this.destinationPath('.husky/pre-commit')
    );

    this.fs.copy(
      this.templatePath('initial/.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('initial/.gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('initial/gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('initial/tsconfig'),
      this.destinationPath('tsconfig.json')
    );
  }

  async writing() {
    await this.addDevDependencies([
      '@types/jest',
      '@types/node',
      'husky',
      'jest',
      'lint-staged',
      'ts-jest',
      'ts-node',
      'typescript',
    ]);
  }

  end() {
    chmodSync(this.destinationPath('.husky/pre-commit'), 0o775);
  }
}

import helpers from 'yeoman-test';
import type { RunResult } from 'yeoman-test';

import AppGenerator from '../src/app';

declare module 'yeoman-test' {
  interface RunContext {
    run(): Promise<RunResult>;
  }

  interface RunResult {
    /** Deletes the test directory recursively. */
    cleanup(): this;
  }
}

describe('generator-latipun:app', () => {
  const projectSetup = {
    projectName: '@test/run-test',
    projectEmoji: '🧪',
    projectTitle: 'Run Test',
    description: 'Test for best cases ✨',
    homepage: 'https://runtest.com',
    repoURL: 'https://github.com/latipun7/test.git',
    authorName: 'Latif Sulistyo',
    authorEmail: 'latifsulistyo.me@gmail.com',
    authorURL: 'https://latipun7.github.io',
    packager: 'yarn',
    deployable: true,
    publishable: false,
  };

  describe('fill all prompts, project deployable, not published', () => {
    let runResult: RunResult;

    beforeAll(async () => {
      runResult = await helpers
        .create(AppGenerator, {
          tmpdir: true,
          namespace: 'latipun:app',
        })
        .withPrompts(projectSetup)
        .run();
    });

    afterAll(() => {
      if (runResult) {
        runResult.cleanup();
      }
    });

    it('should create all boilerplate files', () => {
      runResult.assertFile([
        '.github/workflows/ci-cd.yml',
        '.github/codeowners',
        '.github/dependabot.yml',
        '.husky/pre-commit',
        '.vscode/settings.json',
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        '.yo-rc.json',
        'license',
        'package.json',
        'readme.md',
        'tsconfig.json',
      ]);
    });

    it('should write correct templates', () => {
      runResult.assertFileContent([
        [
          '.github/workflows/ci-cd.yml',
          'Continuous Integration and Continuous Deployment ⚙🚀',
        ],
        ['.github/workflows/ci-cd.yml', 'Yarn Cache Directory Path 🐈'],
        ['.github/workflows/ci-cd.yml', 'yarn-cache-dir-path'],
        ['.github/workflows/ci-cd.yml', 'yarn cache dir'],
        [
          '.github/workflows/ci-cd.yml',
          'yarn install --frozen-lockfile --check-files',
        ],
        ['.github/workflows/ci-cd.yml', 'yarn lint'],
        ['.github/workflows/ci-cd.yml', 'yarn format'],
        ['.github/workflows/ci-cd.yml', 'yarn test'],
        ['.github/workflows/ci-cd.yml', 'yarn build'],
        ['.github/workflows/ci-cd.yml', 'yarn.lock'],
        ['.github/workflows/ci-cd.yml', 'Deploy 🚀'],
        [
          '.github/codeowners',
          'Latif Sulistyo <latifsulistyo.me@gmail.com> (https://latipun7.github.io)',
        ],
        ['.github/codeowners', '# a.k.a. Latipun / Ryuuki'],
        ['.github/dependabot.yml', 'chore(ci/cd)'],
        ['.vscode/settings.json', 'liveServer.settings.root'],
        [
          'license',
          'Latif Sulistyo <latifsulistyo.me@gmail.com> (https://latipun7.github.io)',
        ],
        ['readme.md', '`@test/run-test 🧪`'],
      ]);

      runResult.assertJsonFileContent('package.json', {
        name: '@test/run-test',
        description: projectSetup.description,
        homepage: projectSetup.homepage,
        author:
          'Latif Sulistyo <latifsulistyo.me@gmail.com> (https://latipun7.github.io)',
        repository: { type: 'git', url: projectSetup.repoURL },
        engines: { node: '>=14', yarn: '>=1.19' },
      });
    });
  });
});

import path from 'path';
import helpers from 'yeoman-test';
import type { RunResult } from 'yeoman-test';

describe('generator-latipun:app', () => {
  let runResult: RunResult;

  beforeAll(async () => {
    runResult = await helpers.run(
      path.join(__dirname, '..', 'generators', 'app')
    );
  });

  it('creates files', () => {
    runResult.assertFile(['dummyfile.txt']);
  });
});

import { kebabCase } from 'lodash';

export const projectNameFilter = (input: string) => {
  const projectNames = input.split('/');

  if (projectNames.length === 2) {
    const [scope, projectName] = projectNames;
    const filteredScope = kebabCase(scope);
    const filteredProjectName = kebabCase(projectName);

    return `@${filteredScope}/${filteredProjectName}`;
  }

  return kebabCase(input);
};

export const githubRepoNameFromURL = (repoURLPattern: string | undefined) => {
  if (!repoURLPattern) return '';

  const testRegex = /\/(?<name>[^/.]+)(?:\.\w+)?$/;
  const repo = testRegex.exec(repoURLPattern)?.groups;

  if (repo && repo.name) return repo.name;

  return '';
};

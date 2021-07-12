# `generator-latipun ⚔️`

[![Discord][discord-image]][discord-url]
[![GitHub Workflow Status][workflow-image]][workflow-url]
[![NPM Package][npm-image]][npm-url]

> Generator Latipun is a Yeoman Generator that let you generate initial typescript project boilerplate ✨

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-latipun` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-latipun
```

Then generate your new project:

```bash
yo latipun
```

## Usage

```log
❯ yo latipun --help
Usage:
  yo latipun:app [<destination>] [options]

Generate Latipun's project boilerplate ⚔️

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers               Default: false
        --skip-install   # Do not automatically install dependencies    Default: false
        --force-install  # Fail on install dependencies error           Default: false
        --ask-answered   # Show prompts for already configured options  Default: false

Arguments:
  destination  #
        The folder to generate the project, absolute or relative to the current working directory.
        If not provided, defaults to the current working directory.
  Type: String  Required: false
```

## Getting To Know Yeoman

- Yeoman has a heart of gold.
- Yeoman is a person with feelings and opinions, but is very easy to work with.
- Yeoman can be too opinionated at times but is easily convinced not to be.
- Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Latif Sulistyo](https://latipun7.github.io)

[discord-image]: https://img.shields.io/discord/758271814153011201?label=Developers%20Indonesia&logo=discord&style=flat-square
[discord-url]: https://discord.gg/njSj2Nq "Chat and discuss at Developers Indonesia"
[workflow-image]: https://img.shields.io/github/workflow/status/latipun7/generator-latipun/Test%20%E2%9A%99%E2%9A%9B%E2%9C%A8%F0%9F%9A%80?label=CI&logo=github%20actions&style=flat-square
[workflow-url]: https://github.com/latipun7/generator-latipun/actions "GitHub Actions"
[npm-image]: https://img.shields.io/npm/v/generator-latipun?label=package&logo=npm&style=flat-square
[npm-url]: https://npmjs.org/package/generator-latipun "generator-latipun on NPM"

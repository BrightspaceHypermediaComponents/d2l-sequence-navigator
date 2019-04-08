[![Build Status](https://travis-ci.com/BrightspaceHypermediaComponents/d2l-sequence-navigator.svg?token=s5DqGXfBESukCURszFfU&branch=master)](https://travis-ci.com/BrightspaceHypermediaComponents/d2l-sequence-navigator)

# d2l-sequence-navigator

[Polymer-3](https://www.polymer-project.org)-based web component for a D2L sequence navigator.

## Installation

```shell
npm install
```

To start a local web server that hosts the demo page and tests:

```shell
polymer analyze > analysis.json && polymer serve
```

The demo will be available at http://127.0.0.1:port/components/d2l-sequence-navigator/demo/. Port is printed to console after the server starts. Alternatively, you can run the following command and then add /demo to the end of the URL:

```shell
polymer analyze > analysis.json && polymer serve --open
```

## Usage

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/2.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

To start a [local web server](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and tests:

```shell
polymer serve
```

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#tests):

```shell
polymer test --skip-plugin sauce
```

To lint AND run local unit tests:

```shell
npm run test
```

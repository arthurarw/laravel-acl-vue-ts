const { ignores, configs } = require('@eduzz/eslint-config'); // Javascript / Typescript / Node

/** @type import('eslint').Linter.Config[] */
module.exports = [...configs, { ignores: ignores() }];

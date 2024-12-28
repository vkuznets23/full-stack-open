import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.js"],
    ignores: ["**/node_modules/**", "**/backend/**"], // Ignore backend files for React linting
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node, // Enable Node.js globals
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      semi: ["error", "always"],
      quotes: ["error", "single"],
    },
  },
];
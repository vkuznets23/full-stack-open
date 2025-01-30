import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false, // Important for Babel parser
        babelOptions: {
          presets: ["@babel/preset-react"], // Enables JSX parsing
        },
      },
      globals: globals.browser,
    },
    plugins: { react },
    rules: {
      "react/react-in-jsx-scope": "off", // Disable outdated rule for React 18
    },
  },
];
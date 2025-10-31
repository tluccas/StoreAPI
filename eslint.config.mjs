import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import jsonc from "eslint-plugin-jsonc";
import parser from "jsonc-eslint-parser";
import { defineConfig } from "@eslint/config-helpers";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    plugins: { prettier: prettierPlugin },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "prettier/prettier": "error",
      "no-useless-catch": "off",
      "lines-between-class-members": "off",
      "padded-blocks": "off",
      "no-param-reassign": "off",
      camelcase: "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    },
  },

  {
    files: ["docs/swagger.json"],
    plugins: { jsonc },
    languageOptions: {
      parser,
    },
    rules: {
      "jsonc/indent": ["error", 2],
      "jsonc/quotes": ["error", "double"],
      "jsonc/no-dupe-keys": "error",
      "jsonc/valid-json-number": "error",
    },
  },
]);

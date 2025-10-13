import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "@eslint/config-helpers";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [
      js.configs.recommended,
    ],
    plugins: { prettier: prettierPlugin },
    languageOptions: { 
        globals: globals.node 
    },
  },
  {
    files: ["**/*.json"],
    extends: [
      json.configs.recommended
    ],
    plugins: { json },
  },
  {
    rules: {
    "prettier/prettier": "error",
    "lines-between-class-members": "off",
    "padded-blocks": "off", 
      "prettier/prettier": "error",
      "no-param-reassign": "off",
      camelcase: "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }]
    }
  }
]);
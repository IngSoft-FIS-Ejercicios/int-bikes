import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

const FILES = ["**/*.{js,mjs,cjs,ts,mts,cts}"];

export default defineConfig([
  {
    files: FILES,
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    files: FILES,
    rules: {
      complexity: ["warn", { max: 10 }],
      "max-depth": ["warn", 3],
      "max-lines-per-function": [
        "warn",
        { max: 50, skipBlankLines: true, skipComments: true },
      ],
      "max-params": ["error", 3],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      // En TypeScript se usa la versión de typescript-eslint de no-unused-vars.
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": "warn",
      "no-param-reassign": "error",
      "no-shadow": "error",
      "prefer-template": "error",
      "no-alert": "error",
    },
  },
  {
    // Un describe por clase: con cobertura 100 % supera fácilmente las 50 líneas.
    files: ["**/*.test.ts"],
    rules: {
      "max-lines-per-function": "off",
    },
  },
]);

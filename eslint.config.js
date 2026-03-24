import borgarLint from "@borgar/eslint-config";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.ts"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { projectService: { allowDefaultProject: [] } },
    },
  },
  tseslint.configs.recommended,
  borgarLint.config.recommended,
  borgarLint.config.stylistic({
    commaDangle: true,
    singleBlocks: true,
    lineLength: 100,
  }),
  {
    rules: {
      'no-shadow': 'off',
    },
  },
]);

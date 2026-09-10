import { createRequire } from "node:module";

const require = createRequire("/usr/lib/node_modules/");
const tsParser = require("@typescript-eslint/parser");

export default [
  { ignores: ["dist/**", "node_modules/**", "build/**"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
    },
    rules: {},
  },
];

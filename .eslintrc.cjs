module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  overrides: [
    {
      files: ["utils/**/*.ts"], // Adjust this pattern to match your directory structure
      rules: {
        "react-refresh/only-export-components": "off",
      },
    },
  ],
  // rules: {
  //   'react-refresh/only-export-components': [
  //     'warn',
  //     { allowConstantExport: true },
  //   ],
  // },
};

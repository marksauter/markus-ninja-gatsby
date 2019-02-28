module.exports = {
  extends: ["standard", "prettier", "prettier/react", "prettier/standard"],
  plugins: ["standard", "react", "prettier"],
  rules: {
    "no-var": "error", // optional, recommended when using es6+
    "no-unused-vars": 1, // recommended

    // standard plugin - options
    "standard/no-callback-literal": ["error", ["cb", "callback"]],

    // react plugin - options
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",

    // prettier plugin - options
    "prettier/prettier": "error",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8, // optional, recommended 6+
  },
}

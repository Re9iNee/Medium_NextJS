const path = require("path");

module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react"],
    rules: {
        "@typescript-eslint/no-unused-vars": "warn",
    },
};

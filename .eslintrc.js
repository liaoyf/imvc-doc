module.exports = {
    env: {
        node: true,
        es6: true
    },
    extends: "eslint:recommended",
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        "no-debugger": "error",
        "no-unused-vars": [
            "warn",
            { vars: "all", args: "after-used", ignoreRestSiblings: false }
        ], //声明未使用的变量 警告
        "no-console": "warn",
        "no-case-declarations": "off",
        "no-useless-escape": "off",
        eqeqeq: ["warn", "allow-null"] //== ===
    }
}

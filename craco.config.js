// craco.config.js
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
    webpack: {
        plugins: {
            add: [
                new MonacoWebpackPlugin({
                    // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
                    languages: ["json"],
                }),
            ],
        },
    },
    style: {
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
};

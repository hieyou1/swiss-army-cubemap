module.exports = {
    "entry": "./src/client.js",
    "output": {
        "path": require("path").resolve(__dirname, "pub"),
        "filename": "client.js"
    },
    "devtool": "source-map",
    "mode": "development"
};
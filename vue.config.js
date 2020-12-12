module.exports = {
    devServer: {
        proxy: {
            "^/api": {
                target: 'http://api.steampowered.com',
                "pathRewrite": { '^/api': '' },
                "changeOrigin": true,
                "secure": false
            },
            "^/store": {
                target: 'https://store.steampowered.com',
                "pathRewrite": { '^/store': '' },
                "changeOrigin": true,
                "secure": false
            },
        }
    }
}
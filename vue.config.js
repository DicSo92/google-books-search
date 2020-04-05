module.exports = {
    publicPath: '/google-books-search/',
    pwa: {
        name: 'Google Books Search',
        short_name: 'GoogleBooks',
        start_url: '/google-books-search/',
        display: 'standalone',
        themeColor: '#267c8b',
        msTileColor: '#222222',

        manifestOptions: {
            name: 'MyWeather.fr',
            short_name: 'MyWeather',
            start_url: '/',
            display: 'standalone',
            themeColor: '#267c8b',
        },
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png?v=2',
            favicon16: 'img/icons/favicon-16x16.png?v=2',
            appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/mstile-150x150.png',
        }
    }
}

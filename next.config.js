const {i18n} = require('./next-i18next.config')
const withPWA = require('next-pwa')

const isProduction = (process.env.NODE_ENV === 'production');

module.exports = withPWA({
    i18n,
    future: {
        webpack5: true,
    },
    pwa: {
        dest: 'public',
        disable: !isProduction
    }
})

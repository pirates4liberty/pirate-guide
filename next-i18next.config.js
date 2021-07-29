const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'cz',
        locales: ["en", "cz"],
        defaultNS: "common",
        debug: false,
        localePath: path.resolve('./public/locales'),
        localeStructure: '{{lng}}/{{ns}}',
        serializeConfig: false,
        keySeparator: ".",
        nsSeparator: ":"
    },
    use: []
}

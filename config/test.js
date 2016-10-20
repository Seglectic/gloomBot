var config = {}
// irc
config.server = 'irc.rizon.net'
config.nick = 'gloombot'
config.options = {
    channels: ['#joe'],
    floodProtection: true,
    floodProtectionDelay: 300
}

// plugin lists
config.plugins = [
    './plugins/welcum.js',
    './plugins/slap.js',
    './plugins/add-ban.js',
    './plugins/debug.js'
]

config.webplugins = [
    './webplugins/banlist.js'
]

config.http = {}
config.http.port = 9192
// defualt, all iface
config.http.addr = null

module.exports = config

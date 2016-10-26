var config = {}
// irc
config.server = 'irc.rizon.net'
config.nick = 'gloombot'
config.options = {
    channels: ['#prussian'],
    floodProtection: true,
    floodProtectionDelay: 300
}

//db
config.db = './.test.db'

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
config.http.root = '/' // I'm lazy and don't want to make subdomains on my shitty apache server running on hyper-v PoS home server
config.http.port = 9192
// defualt, all iface
config.http.addr = null

module.exports = config

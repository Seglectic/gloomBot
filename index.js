/*
 * IRC bot for #depression
 * Copyright 2016 prussian
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var irc = require('irc'),
    Nedb = require('nedb'),
    express = require('express'),
    config = require('./config/test'),
    app = express(),
    glum = express.Router(),
    db = new Nedb(), // in memory... for now i guess
    gloom = new irc.Client(
        config.server, 
        config.nick, 
        config.options
    )

// load plugins
config.plugins.forEach(plugin => {
    require(plugin)(gloom, db)
})

config.webplugins.forEach(plugin => {
    require(plugin)(glum, db)
})

// web stuff
app.use('/glum', glum)
app.use('/', express.static(__dirname+'/public'))
app.get('/', (req, res) => {
    res.sendfile(__dirname+'/public/index.html')
})

app.listen(config.http.port, config.http.addr)

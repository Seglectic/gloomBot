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
    config = require('./config/test'),
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

/*
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

/*
 * plugin that gives ops an ability to add timed bans
 * example: .addban name ["reason"] [days til unban (max 24)]
 */

module.exports = (gloom, db) => {
    
    // if app reset reapply unban timers
    db.find({ unbanAt: { $ne: null } }, (err, users) => {
        
        if (err) return
        
        users.forEach(user => {
            setTimeout(() => {
                gloom.send('MODE', user.chan, '-b', `*!*@${user.vhost}`)

                db.remove({ nick: user.nick })
            }, user.unbanAt - new Date().getTime())
        })
    })

    // wew lad
    gloom.addListener('message', (nick, chan, msg) => {
        
        var ban = msg.match(/^[.!]addban (.*)/)
        if (!ban) return

        // ban opts 
        // 0: nick 
        // 1: double/single qouted string for reason 
        // 2: ban in days, less than 24
        var banopts = ban[1].split(/\s+(?=(?:[^\'\"]*[\'\"][^\'\"]*[\'\"])*[^\'\"]*$)/)
        gloom.whois(nick, whois => {
            
            // verify they are mods for channel or exit
            var chan_admin = whois.channels.filter((channel) => {
                return RegExp('^[@&~]'+chan).test(channel)
            })
            if (!chan_admin.length == 1) return 

            // BAN
            // 2 lazy to actually un callback hell this
            gloom.whois(banopts[0], whois => {

                gloom.send('MODE', chan, '+b', `*!*@${whois.host}`)
                gloom.send('KICK', chan, banopts[0], banopts[1])

                // if unban date specified
                var unbanDate = null
                if (banopts[2] && +banopts[2] < 24 && +banopts[2] > 0) {
                    unbanDate = new Date().getTime() + (banopts[2] * 24 * 60 * 60 * 1000)
                    // auto unban!
                    setTimeout(() => {
                        gloom.send('MODE', chan, '-b', `*!*@${whois.host}`)
                        db.remove({ nick: banopts[0] })
                    }, unbanDate - new Date().getTime() )
                }

                // add ban to db
                db.insert({
                    nick: banopts[0],
                    vhost: whois.host,
                    chan: chan,
                    reason: banopts[1],
                    unbanAt: unbanDate 
                })
            })
        })
    })
}

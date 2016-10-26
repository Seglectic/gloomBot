/*
 * Copyright 2016 <name of copyright holder>
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
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
                slap.js
    Somewhat generic slapping script
    to use as an example for commands
*/

var tally = [ //How many we slappin with?
    'some',
    'a few',
    'like a million',
    'inumerable',
    'a dozen',
    'a handful',
    'a bag of',
    'a truckload of',
    'TONS of',
    'NUM',
]

var adject = [ //Adjective for slap object
    'dirty',
    'filthy',
    'smelly',
    'spiffy',
    'elegant',
    'snazzy',
    'chic',
    'grubby',
    'grimy',
    'convoluted',
    'intricate',
]

var slapject = [ //Object to slap with
    'goats',
    'panties',
    'trout',
    'cod',
    'nipples',
    'mealworms',
    'tacos',
]

module.exports = gloom => {
    gloom.addListener('message', (nick, chan, msg) => {
        var target = msg.match(/^[.!]slap (\S*)/)
        if (target) {
            target = target[1]
            var t = tally[Math.floor(Math.random()*tally.length)]
            if (t=='NUM'){t=String(Math.floor(Math.random()*99999))} //Translates 'NUM' to a random number
            var a = adject[Math.floor(Math.random()*adject.length)]
            var s = slapject[Math.floor(Math.random()*slapject.length)]
            var slapMsg = nick+' slapped '+target+' with '+t+' '+a+' '+s+'!'
            gloom.say(chan, slapMsg)
        }
    })
}

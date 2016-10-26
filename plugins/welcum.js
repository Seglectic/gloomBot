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
					welcum.js
	This plugin welcomes users to the channel
	Selects a random greeting for new users

	To avoid spam, welcum should:
		Wait a short while before welcoming
		
		Have a cooldown per-nick/host to not
		welcome the same users over and over

	Welcum should also welcome back regular or voiced users :3
*/

var msgs = [
    'Welcome, ',
    'Hi ', 
    'Sup ',
    'Hey look, it\'s '
]

module.exports = gloom => {
    gloom.addListener('join', (channel, nick) => {
        // if (nick == config.nick) return
        var msg = msgs[Math.floor(Math.random()*msgs.length)] //Selects a random msg
        gloom.say(channel, msg+nick)
    })
}

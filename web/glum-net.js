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
                                glumNet.js
        "The net's foremost contender in all things gloomy and glum!"

        glumNet hosts a web display for users to see those who are banned
        as well as anything else that needs displaying from the 'public' dir
*/

var http = require('http')

module.exports = db => {
    http.createServer((req, res) => {
        db.find({}, (err, bans) => {
            res.send(bans)
        })
    }).listen(9999)
}

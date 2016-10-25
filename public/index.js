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

var choo = require('choo'),
    http = require('choo/http'),
    html = require('choo/html'),
    app = choo()

app.model({
    state: {
        bans: [],
        filter: ''
    },
    effects: {
        getBans: (data, state, send, done) => {
            http('/glum/banlist', (err, res, body) => {
                send('statusChange', body || [], done)
            })
//            send('banChange', [{
//                nick: 'test',
//                vhost: 'test',
//                unbanAt: new Date().getTime(),
//                reason: 'yolo'
//            },{
//                nick: 'blah',
//                vhost: 'test',
//                unbanAt: new Date().getTime(),
//                reason: 'yolo'
//            },{
//                nick: 'another',
//                vhost: 'test',
//                unbanAt: new Date().getTime(),
//                reason: 'yolo'
//            }], done)
        }
    },
    reducers: {
        banChange: (data, state) => {
            return Object.assign({}, state, { bans: data })
        },
        filterChange: (data, state) => {
            return Object.assign({}, state, { filter: data })
        }
    },
    subscriptions: {
        statusRefresh: (send, done) => {
            send('getBans', null, done)
            setInterval(() => {
                send('getBans', null, done)
            }, 30000)
        }
    }
})

var view = (state, prev, send) => html`
    <div>
        <div class="jumbotron text-xs-center">
            <div class="container">
                <h1 class="jumbotron-heading">#depression banlist</h1>
                <p>Those who need a timeout =]</p>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control" 
                        value="${state.filter}"
                        placeholder="Filter by nick"
                        oninput=${(e) => send('filterChange', e.target.value)}>
                </div>
            </div>
        </div>
        </div>

        <div class="container clearfix">
            ${state.bans.filter((ban) => {
                return ban.nick.indexOf(state.filter) != -1
            }).map((ban) => {
                return html`
                    <address class="card float-sm-left">
                        <strong>${ban.nick}</strong><br>
                        <strong>reason</strong> ${ban.reason}<br>
                        <strong>til</strong> ${new Date(ban.unbanAt).toISOString()}<br>
                    </address>
                `
            })}
        </div>

        <div class="container">
            <hr>
            <address class="text-muted">
                <strong>© 2016 prussian</strong><br>
                <a href="https://github.com/GeneralUnRest/gloomBot">source</a><br>
                Message me on Rizon!<br>
            </address>
        </div>
    </div>
`

app.router((route) => [
    route('/', view)
])

var tree = app.start()
document.body.appendChild(tree)

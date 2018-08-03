/* tslint:disable */

import { expect } from 'chai';
import * as io from 'socket.io-client';

describe('Server', () => {

    var socketOptions ={
            transports: ['websocket'],
            'force new connection': true
        };

    it('lets a player create a lobby', () => {
        var client = io.connect('http://localhost:3141', socketOptions);

        client.once('connect', () => {
            client.once('lobby created', (data: any) => {
                expect(data.to.equal('1234'))
            });
            client.emit('lobby create')
        })
    })
})
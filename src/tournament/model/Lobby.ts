import * as randomWord from 'random-word'

import { Tournament } from 'tournament/Tournament';

import Player from './Player';

export class Lobby {
    public admin: Player;
    public token: string;
    public players: Array<Player>;
    public tournament: Tournament;
    bannedPlayers: Array<string>;

    constructor(admin: Player) {
        this.admin = admin;
        this.players = [];
        this.bannedPlayers = [];
        this.token = `${randomWord()}-${randomWord()}`;
    }

    toObject() {
        return {
            token: this.token,
            players: this.players.map(player => ({
                token: player.token,
            })),
            tournament: this.tournament ? this.tournament.getStats() : null,
        };
    }
}
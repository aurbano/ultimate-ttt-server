"use strict";
exports.__esModule = true;
var Match_1 = require("../match/Match");
var FreeForAllMatchmaker = (function () {
    function FreeForAllMatchmaker(players, options, sendStats) {
        this.players = players;
        this.options = options;
        this.sendStats = sendStats;
        this.index = 0;
        this.maxMatches = Math.pow(players.length, players.length);
    }
    FreeForAllMatchmaker.prototype.isFinished = function () {
        return this.finished;
    };
    FreeForAllMatchmaker.prototype.getRemainingMatches = function (tournamentStats) {
        var _this = this;
        if (this.index >= this.players.length) {
            return [];
        }
        var match = [];
        var matches = this.players.map(function (playerA, $index) {
            if (_this.index === $index)
                return [];
            return [_this.players[_this.index]].map(function (playerB) {
                if (tournamentStats.matches.find(function (match) {
                    return match.players[0].token === playerA.token && match.players[1].token === playerB.token ||
                        match.players[1].token === playerA.token && match.players[0].token === playerB.token;
                }))
                    return null;
                return new Match_1["default"]([playerA, playerB], {
                    maxGames: _this.options.maxGames,
                    timeout: _this.options.timeout,
                    autoPlay: _this.options.autoPlay
                }, _this.sendStats);
            });
        }).reduce(function (result, current, idx) {
            return result.concat(current);
        }, []).filter(function (match) { return match; });
        ++this.index;
        this.finished = this.index >= this.players.length;
        return matches;
    };
    FreeForAllMatchmaker.prototype.getRanking = function (stats) {
        var playerStats = {};
        stats.matches.forEach(function (match) {
            if (!playerStats[match.players[0].token]) {
                playerStats[match.players[0].token] = 0;
            }
            if (!playerStats[match.players[1].token]) {
                playerStats[match.players[1].token] = 0;
            }
            var p0wins = match.stats.wins[0];
            var p1wins = match.stats.wins[1];
            if (p0wins === p1wins) {
                return;
            }
            if (p0wins > p1wins) {
                playerStats[match.players[0].token]++;
            }
            if (p1wins > p0wins) {
                playerStats[match.players[1].token]++;
            }
        });
        return Object.keys(playerStats).map(function (token) { return ({
            player: token,
            gamesWon: playerStats[token]
        }); }).sort(function (a, b) { return b.gamesWon - a.gamesWon; }).map(function (playerRank) { return playerRank.player; });
    };
    return FreeForAllMatchmaker;
}());
exports["default"] = FreeForAllMatchmaker;
//# sourceMappingURL=FreeForAllMatchmaker.js.map
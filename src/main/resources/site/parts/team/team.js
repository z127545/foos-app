var mustacheLib = require('/lib/xp/mustache');
var foosLib = require('/lib/foos');
var portalLib = require('/lib/xp/portal');

exports.get = function (req) {

    //Retrieves the team
    var team = portalLib.getContent();

    //Generates its stats
    foosLib.generateTeamStats(team);
    team.gen.nbGames = team.gen.nbGames.toFixed(0);
    team.gen.ratioGamesWon = team.gen.ratioGamesWon.toFixed(0) + "%";

    //Retrieve the team players
    var playersIds = foosLib.toArray(team.data.playerIds);
    log.info(playersIds.length);
    var players = playersIds.map(function (playerId) {
        return foosLib.getContentByKey(playerId);
    });
    players.forEach(function (player) {
        foosLib.generatePictureUrl(player);
        foosLib.generatePageUrl(player);
    });

    var view = resolve('team.html');
    var body = mustacheLib.render(view, {
        team: team,
        players: players
    });
    return {
        body: body
    }
};

var mustacheLib = require('/lib/xp/mustache');
var portalLib = require('/lib/xp/portal');
var gamesWidgetLib = require('/lib/widgets/games/games');

var view = resolve('game.html');

// Handle the GET request
exports.get = function (req) {
    var game = portalLib.getContent();
    var body = mustacheLib.render(view, {
        gamesWidget: gamesWidgetLib.render([game], false)
    });
    return {
        body: body
    }
};
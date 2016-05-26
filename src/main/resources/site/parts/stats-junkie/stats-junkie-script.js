var playerStats;
var currentStatName;

$.ajax("{{playerStatsServiceUrl}}").done(function (data) {
    playerStats = data;
    currentStatName = "score";

    var firstPlayer = playerStats[0];
    for (var statName in firstPlayer) {
        $("#foos-stats-junkie-select").append("<option value='" + statName + "'>" + firstPlayer[statName].name + "</option>");
    }

    $("#foos-stats-junkie-select").val(currentStatName);
    $("#foos-stats-junkie-select").change(function () {
        currentStatName = $("#foos-stats-junkie-select").val();
        refreshFoosStatsJunkieTable();
    });
    refreshFoosStatsJunkieTable();
    $("#foos-stats-junkie-tmp-message").remove();
});


function refreshFoosStatsJunkieTable() {
    $("#foos-stats-junkie-table .foos-body").remove();

    playerStats.sort(function (playerStats1, playerStats2) {
        if ("N/A" == playerStats1[currentStatName].team) {
            return 1;
        }
        if ("N/A" == playerStats2[currentStatName].team) {
            return -1;
        }
        return playerStats2[currentStatName].team - playerStats1[currentStatName].team
    });

    var template = '{{{playerStatsRowTemplate}}}';
    var index = 1;
    playerStats.forEach(function (playerStats) {
        var row = Mustache.render(template, {
            even: (index % 2) == 0,
            rank: index,
            displayName: playerStats.playerName,
            soloValue: formatAsInteger(playerStats[currentStatName].solo),
            teamValue: formatAsInteger(playerStats[currentStatName].team),
            totalValue: formatAsInteger(playerStats[currentStatName].total)
        });

        $("#foos-stats-junkie-table").append(row);
        index++;
    });
}

function formatAsInteger(number) {
    return isNaN(number) ? number : number.toFixed(0);
}
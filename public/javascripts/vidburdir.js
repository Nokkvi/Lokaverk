
$( document ).ready(function() {
    $.ajax({
        'url': 'https://apis.is/sports/football',
        'type': 'GET',
        'dataType': 'json',
        'ifModified': true,
        'success': function(response) {
            setupFootball(response.results);
        }
    });

    ChannelSelection();
    animationsHandler();

});

function animationsHandler() {
    $('.header').hide().fadeIn(1000);
    $('.panel').hide().fadeIn(1000);

    // Animation á örvum
    $('.table').on('click', 'tr', function() {
        $(this).find('.glyphicon').delay(250).toggleClass('glyphicon-menu-down').toggleClass('glyphicon-menu-up');
    });

    // Animation á dropdown takkanum
    $('#channel-selection').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(250);
    });

    $('#channel-selection').on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(250);
    });
}

function setupFootball(data) {
    $(".table tbody").empty();
    for (var i = 0; i < data.length; i++) {
        var current = data[i];
        var home = current.homeTeam;
        var away = current.awayTeam;
        var date = current.date;
        var time = current.time;
        var tournament = current.tournament;
        var content = assembleContentHTMLFootball(home, away, date, time, tournament);
        $(".table tbody").append(content);
    }
}

function setupHandball(data) {
    $(".table tbody").empty();
    for (var i = 0; i < data.length; i++) {
        var current = data[i];
        var teams = current.Teams;
        var date = current.Date;
        var time = current.Time;
        var tournament = current.Tournament;
        var venue = current.Venue;
        var content = assembleContentHTMLHandball(teams, date, time, tournament, venue);
        $(".table tbody").append(content);
    }
}


function assembleContentHTMLFootball(home, away, date, time, tournament) {

    return "<tr data-toggle='collapse' data-target='#"+ date +"'><td>" + date + "</td><td>" + time + "</td><td>" + home + "</td><td>" + away + "</td><td>" + tournament + "</td></tr>";

    return "<tr data-toggle='collapse' data-target='#" + home + "'><td>" + away + "</td><td>" + date + "</td><td>" + time + "</td><td>" + tournament + "</td></tr>";

}

function assembleContentHTMLHandball(teams, date, time, tournament, venue) {

    return "<tr data-toggle='collapse' data-target='#"+ date +"'><td>" + date + "</td><td>" + time + "</td><td>" + teams + "</td><td>" + venue + "</td><td>" + tournament + "</td></tr>";

    return "<tr data-toggle='collapse' data-target='#" + teams + "'><td>" + date + "</td><td>" + time + "</td><td>" + tournament + "</td><td>" + venue + "</td></tr>";

}


function ChannelSelection() {
    $("#channel-selection li").click(function() {
        $(".table tbody").empty();
        var content = "<tr><td class='loading'>Sæki dagskrá</td></tr>";
        $(".table tbody").append(content);
        $("#current-channel").text($(this).text());

        var $this = $(this);
        if (typeof this.ajaxHtml !== 'undefined') {
            if($(this).text() == 'Fótbolti'){
                setupFootball(this.ajaxHtml);
                return;
            }else{
                setupHandball(this.ajaxHtml);
                return;
            }
        }

        $.ajax({
            'url': 'https://apis.is/sports/' + $(this).attr('id'),
            'type': 'GET',
            'dataType': 'json',
            'success': function(response) {
                $this[0].ajaxHtml= response.results;
                if($(this).attr('id') == 'football'){
                    setupFootball(response.results);
                }else {
                    setupHandball(response.results);
                }

            }
        });
    });
}
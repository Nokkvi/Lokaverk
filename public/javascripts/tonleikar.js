
$( document ).ready(function() {
    $.ajax({
        'url': 'http://apis.is/concerts',
        'type': 'GET',
        'dataType': 'json',
        'ifModified': true,
        'success': function(response) {
            setupConcerts(response.results);
        }
    });

    //ChannelSelection();
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


function setupConcerts(data) {
    $(".table tbody").empty();
    for (var i = 0; i < data.length; i++) {
        var current = data[i];
        var eventDateName = current.eventDateName;
        var name = current.name;
        var dateOfShow = current.dateOfShow;
        var userGroupName = current.userGroupName;
        var eventHallName = current.eventHallName;
        var imageSource = current.imageSource;
        var content = assembleContentHTMLConcert(eventDateName, name, dateOfShow, userGroupName, eventHallName, imageSource);
        $(".table tbody").append(content);
    }
}


function assembleContentHTMLConcert(eventDateName, name, dateOfShow, userGroupName, eventHallName, imageSource) {

    return "<tr data-toggle='collapse' data-target='#" + eventDateName + "'><td>" + name + "</td><td>" + dateOfShow + "</td><td>" + userGroupName + "</td><td>" + eventHallName + "</td><td>" + imageSource + "</td></tr>";

}


/*function ChannelSelection() {
    $("#channel-selection li").click(function() {
        $(".table tbody").empty();
        var content = "<tr><td class='loading'>Sæki dagskrá</td></tr>";
        $(".table tbody").append(content);
        $("#current-channel").text($(this).text());

        var $this = $(this);
        if (typeof this.ajaxHtml !== 'undefined') {
            setupConcerts(this.ajaxHtml);
            return;
        }

        $.ajax({
            'url': 'http://apis.is/concerts/',
            'type': 'GET',
            'dataType': 'json',
            'success': function(response) {
                $this[0].ajaxHtml= response.results;
                setupConcerts(response.results);
            }
        });
    });
}*/
//
// @Title = feed-the-burn.js
// @Author = Chris King
// @Description = The main JS file for feed-the-burn a soundcloud app for finding mixes for your workout.
// 
//

//Add Tracks to Tracklist:
function AddTracksToTracklist(tracks, list){
    $(tracks).each(function(track) {
        //console.log(this);
        list.append("<li> <a href='" + this.permalink_url + "''>"+ this.user.username + " - " + this.title + "</a></li>");
    });
}

function CreateTrackRow(track){
    var row_string = "";
    row_string += ( 
        "<tr><td>" + track.user.username + 
        "</td><td><a target='_blank' href='" + track.permalink_url + 
        "''>" + track.title + "</a></td><td>" +
        track.bpm + "</td><td>" + track.genre +
        "</td><td>" + track.duration + "</td><td>"
    )
    if (track.downloadable === true) {
        row_string += "Yes";
    }
    row_string += "</td></tr>";
    return row_string;
}

//Add Tracks to Table:
function AddTracksToTable(tracks, table){
    $(tracks).each(function(track) {
        //console.log(this);
        table.append(CreateTrackRow(this));
    });
}

//Get state info of form
function GetStateOfForm(form){
    var form_state = {};
    var bpm = $('#BPM :selected').text();
    console.log(bpm);
    
    //120 or lower
    if (bpm === "<120"){
        form_state['bpm'] = {
            from: 0,
            to: 120
        };
    } else if (bpm === "120 - 130"){
        form_state['bpm'] = {
            from: 120,
            to: 130
        };
    } else if (bpm === "130 - 140"){
        form_state['bpm'] = {
            from: 130,
            to: 140
        }
    } else if (bpm === "140 - 150"){
        form_state['bpm'] = {
            from: 140,
            to: 150
        }
    } else if (bpm === "150 - 160"){
        form_state['bpm'] = {
            from: 150,
            to: 160
        }
    } else if (bpm === "160 - 170"){
        form_state['bpm'] = {
            from: 160,
            to: 170
        }
    } else if (bpm === ">180"){
        form_state['bpm'] = {
            from: 180,
        }
    } else {
        form_state['bpm'] = {
            from: 80,
            to: 90
        }
    }
    console.log(form_state);
    return form_state;
}

//Setup
$(document).ready(function() {
    //Initialize the connection to soundcloud
    SC.initialize({
        client_id: 'e30e2c947a1035c10c66b6ab5780d629'
    });

    //Listen to submit button
    $('#submit').click(function() {
        var query = GetStateOfForm($('filterForm'));
        SC.get('/tracks', query , function(tracks) {
            console.log(tracks);
            $("#resultsTable > tbody").children().remove();
            AddTracksToTable(tracks, $('#resultsTable > tbody'));
        });
    });
    // BPM
    // Find all tracks with a bpm of 120.
    // Log them to the console, then add them to a list
    //
    SC.get('/tracks', { 
        bpm: { 
            from: 120 
        } 
    }, function(tracks) {
        //console.log(tracks);
        //AddTracksToTable(tracks, $('#resultsTable > tbody'));
    });

    // Duration
    // Find all tacks with a duration of 30 - 40 minutes
    // Then Add them to a list
    //
    var thirty_minutes_in_milis = 1800000;
    var fourty_minutes_in_milis = 2400000;
    SC.get('/tracks', { 
        duration: { 
            from: thirty_minutes_in_milis, 
            to: fourty_minutes_in_milis 
        },
        bpm: { 
            from: 120 
        }
    }, function(tracks) {
        //console.log(tracks);
        //AddTracksToTable(tracks, $('#resultsTable > tbody'));
    });

    // Genre
    // Find all tracks with a genre of "dubstep"
    //
    SC.get('/tracks', { 
        genre: "dubstep" 
    }, function(tracks) {
        //console.log(tracks);
        //AddTracksToTracklist(tracks, $('#GenreList'));
    });
});
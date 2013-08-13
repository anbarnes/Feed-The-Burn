//
// @Title = feed-the-burn.js
// @Author = Chris King
// @Description = The main JS file for feed-the-burn a soundcloud app for finding mixes for your workout.
// 
//

function millisecondsToTime(milli){
      var seconds = Math.floor((milli / 1000) % 60);
      var minutes = Math.floor((milli / (60 * 1000)) % 60);
      return minutes + "m : " + seconds + " s";
}

//Add Tracks to Tracklist:
function AddTracksToTracklist(tracks, list){
    $(tracks).each(function(track) {
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
        "</td><td>" + millisecondsToTime(track.duration) + "</td><td>"
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
        table.append(CreateTrackRow(this));
    });
}

function set_BPM_from_form(bpm, form_state){
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
    }
    
    return form_state;
}

function set_duration_from_form(duration, form_state){
    if (duration === "<5"){
        form_state['duration'] = {
            from: 0,
            to: 300000
        };
    } else if (duration === "5 - 10"){
        form_state['duration'] = {
            from: 300000,
            to: 600000
        };
    } else if (duration === "10 - 15"){
        form_state['duration'] = {
            from: 600000,
            to: 900000
        }
    } else if (duration === "15 - 20"){
        form_state['duration'] = {
            from: 900000,
            to: 1200000
        }
    } else if (duration === "20 - 30"){
        form_state['duration'] = {
            from: 1200000,
            to: 1500000
        }
    } else if (duration === ">30"){
        form_state['duration'] = {
            from: 1500000,
            to: 1800000
        }
    }
    else {
        form_state['duration'] = {
            from: 300000,
            to: 400000
        }
    }
    
    return form_state;
}

function set_genre_from_form(genre, form_state){
    if (genre == 'NA'){
        return form_state;
    }
    form_state['genres'] = genre;
    return form_state;
}

//Get state info of form
function GetStateOfForm(form){
    var form_state = {};
    var bpm = $('#BPM :selected').text();
    //Genre was removed due to soundcloud API problems
    //form_state = set_genre_from_form($('#GENRE :selected').text(), form_state);
    form_state = set_duration_from_form($('#DURATION :selected').text(), form_state);
    form_state = set_BPM_from_form(bpm, form_state);
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
            $("#resultsTable > tbody").children().remove();
            AddTracksToTable(tracks, $('#resultsTable > tbody'));
        });
    });

});
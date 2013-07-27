/*
@Title = feed-the-burn.js
@Author = Chris King
@Description = The main JS file for feed-the-burn a soundcloud app for finding mixes for your workout.

*/

//Add Tracks to Tracklist:
function AddTracksToTracklist(tracks, list){
    $(tracks).each(function(track) {
            console.log(this);
            list.append("<li> <a href='" + this.permalink_url + "''>"+ this.user.username + " - " + this.title + "</a></li>");
        });
}

//Setup
$(document).ready(function() {
    //Initialize the connection to soundcloud
    SC.initialize({
        client_id: 'e30e2c947a1035c10c66b6ab5780d629'
    });
    
    /* BPM
    // Find all tracks with a bpm of 120.
    // Log them to the console, then add them to a list
    */
    SC.get('/tracks', { bpm: { from: 120 } }, function(tracks) {
        console.log(tracks);
        AddTracksToTracklist(tracks, $('#BPMList'));
    });

    /* Duration
    // Find all tacks with a duration of 30 - 40 minutes
    // Then Add them to a list
    */
    var thirty_minutes_in_milis = 1800000;
    var fourty_minutes_in_milis = 2400000;
    SC.get('/tracks', { length: { from: thirty_minutes_in_milis, to:fourty_minutes_in_milis } }, function(tracks) {
        console.log(tracks);
        AddTracksToTracklist(tracks, $('#DurationList'));
    });

    /* Genre
    // Find all tracks with a genre of "dubstep"
    */
    SC.get('/tracks', { genre: "dubstep" }, function(tracks) {
        console.log(tracks);
        AddTracksToTracklist(tracks, $('#GenreList'));
    });
});



//Example Searching
//The line below waits for all content to be delivered to the browser before executing.
//Demo code for tracklist
/*
$(document).ready(function() {
    var url = "http://api.soundcloud.com/users/2431310/tracks.json?client_id=e30e2c947a1035c10c66b6ab5780d629";
    $.getJSON(url, function(tracks) {
        $(tracks).each(function(track) {
            console.log(this);
            $('#TrackList').append("<li>" + this.user.username + " - " + this.title + "</li>");
        }
    )});
});
*/
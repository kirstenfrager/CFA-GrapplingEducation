var express = require('express');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');


// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
// var busyTime = 0;


// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
  function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);


  // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
       if (err) {
         getNewToken(oauth2Client, callback);
       } else {
         oauth2Client.credentials = JSON.parse(token);
         callback(oauth2Client);
       }
     });
   }


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      console.log("token is: ", token)
      storeToken(token);
      callback(oauth2Client);
    });
  });
}


/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}


/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

/////////////////////////////////////////////////////////////////////////////////////////////
function listEvents(auth) {
  var calendar = google.calendar('v3');
  var countMin = 8;
  // start working hours time : start query
  var countMax = 9;
  // one hour seperation

  var freeTime = [0,0,0,0,0,0,0,0,0,0,0,0];
  // empty array to pass in freeTime : list of all times available to book (no event scheduled)
  // 0 represents time unavailable to book. needs to be subsituted with event

  var dmin = new Date();
  var dmax = new Date();

  var counter = 0;

    dmin.setHours(countMin,0,0);
    dmax.setHours(countMax,0,0);

      calendar.events.list({
        auth: auth,
        calendarId: 'klockesodhi@gmail.com',
        timeMin: (dmin.toISOString()),
      // add in a max time set 1 hour apart from the min time

        timeMax: (dmax.toISOString()),
        maxResults: 1,
        singleEvents: true,
        orderBy: 'startTime'
      }, function(err, response) {
      // console.log(events)
        if (err) {
          console.log('The API returned an error: ' + err);
        return;
      }
        var events = response.items;

      // console.log(events)
        if (events.length == 0) {
          // freeTime[counter] = (freeTime[counter] + countMin);
          // counter = counter + 1;

          console.log("Available to book a class")
          // console.log("free" + freeTime)
        } else {
          // counter = counter + 1;
          console.log("unable to book class")
          // console.log(false)
        }
        })
        // countMin = countMin + 1;
        // countMax = countMax + 1;
  }
  // console.log("original" + freeTime)


    //else {
      //console.log('Upcoming 10 events:');
      //for (var i = 0; i < events.length; i++) {
        //var event = events[i];
        //var start = event.start.dateTime || event.start.date;
        //var end = event.end.dateTime || event.end.date;
        //var startDate = new Date(start).toDateString();
        //var startTime = new Date(start).toTimeString();
        //var endTime = new Date(end).toTimeString();

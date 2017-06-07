var express = require('express');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
const getTimeSlots = require('../models/bookingSlots');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

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

function listEvents(auth) {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'klockesodhi@gmail.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    // console.log(events)
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;

    var slots = getTimeSlots(new Date(), 7);

    // console.log(events)
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {

      for (var i = 0; i < slots.length; i++) {
        var slot = slots[i];
// write another test copy off screen data google gave you and go back to calendar test. demo data from google.
// write function that updates slots based on googles calendar
    // **********  updateBookingSlotsFromGoogleEvents()


      // console.log('Upcoming 10 events:');
      // for (var i = 0; i < events.length; i++) {
      //   var event = events[i];
      //   var start = event.start.dateTime || event.start.date;
      //   var end = event.end.dateTime || event.end.date;
      //   var startDate = new Date(start).toDateString();
      //   var startTime = new Date(start).toTimeString();
      //   var endTime = new Date(end).toTimeString();



        // console.log('%s - %s', startDate, endReadable);

        // **** busyEvents: array of events from google calendar which has : startDateTime and endDateTime.
        // creating a hash with key value pairs of start time and end time for each event
        // ***************** date bug because of night shifts????
        // busyTime = { date: startDate, startTime: startTime, endTime: endTime };
        // busyTime = { start: start, end: end }
        // console.log(busyTime)
      // }
    }
  }
  });
};

// listEvents();
// busyEvents = (startReadable, endReadable)
// console.log(busyEvents)

// desiredEvents : array you make of possible appointments - eg q1 hour on the hour as we said from 9am-10pm.



// function queryFreeBusy(auth) {
//   var today = new Date();
//   var timeMax = new Date();
//   timeMax.setDate(today.getDate()+30);
//
//   var calendar = google.calendar('v3');
//   calendar.freebusy.query({
//     timeMin: (new Date()).toISOString(),
//     timeMax: timeMax,
//     items: [
//       {
//         id: 'klockesodhi@gmail.com',
//       }
//     ]
// }, function(err, response) {
//   console.log("freeBusy")
//     if (err) {
//       console.log('The API returned an error: ' + err);
//       return;
//     }
//     var events = response.items;
//     if (events.length == 0) {
//       console.log('No free time.');
//     } else {
//       console.log('Free Time:');
//       for (var i = 0; i < events.length; i++) {
//         var event = events[i];
//         var start = event.start.dateTime || event.start.date;
//         console.log('%s - %s', start, event.summary);
//       }
//     }
//   });
// }

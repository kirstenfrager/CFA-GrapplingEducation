const expect = require('chai').expect;
const getTimeSlots = require('../models/bookingSlots');


describe('calendar tests', function() {

  it ('can generate booking slots', function() {

    let today = new Date("2017-07-15");
    let tomorrow = new Date("2017-07-16");
    let last = new Date("2017-07-21");
    const bookingSlots = getTimeSlots(today, 7);
    expect(bookingSlots).to.have.lengthOf(7*13);
    expect(bookingSlots[0]).to.deep.equal({startTime: 8, endTime: 9, date: today, free: true});
    expect(bookingSlots[12]).to.deep.equal({startTime: 20, endTime: 21, date: today, free: true});
    expect(bookingSlots[13]).to.deep.equal({startTime: 8, endTime: 9, date: tomorrow, free: true});
    expect(bookingSlots[(7*13)-1]).to.deep.equal({startTime: 20, endTime: 21, date: last, free: true});
  });
});

function updateBookingSlotsFromGoogleEvents(slots, googleEvents) {

  // booking Slots are correctly updated with the free property set to true or false
  // set to false if ther eis a conflict for that slot based on google event
}

describe('google calendar tests', function() {

  it ('can update free time from google', function() {

    let googleEvents = [
    {},

    ];

    let today = new Date("2017-07-15");
    let bookingSlots = getTimeSlots(today, 7);

    bookingSlots = updateBookingSlotsFromGoogleEvents(bookingSlots, googleEvents);
    expect(bookingSlots[0]).to.include({free: false});
  });
});

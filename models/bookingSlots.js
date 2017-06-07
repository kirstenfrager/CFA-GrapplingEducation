const expect = require('chai').expect;
const getTimeSlots = require('../models/bookingSlots');

function getTimeSlots(today, numDays) {

  let times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let slots = [];

  for (let i = 0; i < numDays; i++) {

    let dailySlots = times.map((time) => {
      let date = new Date(today.getTime());
      let increadedDate = new Date(date.setDate(date.getDate()+i));
      let dateOnly = increadedDate.toDateString();
      return {free: true, startTime: time, endTime: time+1, date: dateOnly}
    })
console.log(dailySlots)
    slots = slots.concat(dailySlots)
  }

  return slots;
}

module.exports  = getTimeSlots;



// function getTimeSlots(today, numDays) {
//
//   let times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
//   let slots = [];
//
//   for (let i = 0; i < numDays; i++) {
//
//     let dailySlots = times.map((time) => {
//       let date = new Date(today.getTime());
//       return {free: true, startTime: time, endTime: time+1, date: new Date(date.setDate(date.getDate()+i))}
//     })
//
//     slots = slots.concat(dailySlots)
//   }
//
//   return slots;
// }
//
// module.exports  = getTimeSlots;

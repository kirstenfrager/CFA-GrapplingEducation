function getTimeSlots(today, numDays) {

  let times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let slots = [];

  for (let i = 0; i < numDays; i++) {

    let dailySlots = times.map((time) => {
      let date = new Date(today.getTime());
      return {free: true, startTime: time, endTime: time+1, date: new Date(date.setDate(date.getDate()+i))}
    })

    slots = slots.concat(dailySlots)
  }

  return slots;
}

module.exports  = getTimeSlots;

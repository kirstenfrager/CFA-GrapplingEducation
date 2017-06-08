![Grappling Education Logo](https://lh3.googleusercontent.com/-YBlptLlddw0/WTdah_YSWwI/AAAAAAAAALU/DS9d9ou5FokEqmWORsDVbKXAohLLBJk8wCLcB/s800/GrapplingEducation.png "GrapplingEducation.png")


## Grappling Education 

**A booking platform for athletes allowing them to book in private training sessions.**

----------

- [Context](#context)
  * [Requirements](#requirements)
- [Client Meeting](#client-meeting)
- [Design](#wireframes-and-design)
  * [Design Changes](#design-changes)
- [Getting Started](#getting-started)
  * [Sub-heading](#sub-heading-2)
    + [Sub-sub-heading](#sub-sub-heading-2)
- [Google Calendar](#google-calendar-sync)
  * [Timekit](#option-one)
    + [Google Calendar API](#option-two)
- [Mocha and Chai Testing](#using-mocha-and-chai-to-help-write-a-function)
  * [Testing Code](#testing-code)
    + [Function Code](#function-code)
- [Platform](#platform)

------

### Context

The booking platform is synced with the trainer's google calendar which renders the 'available to book' time slots depending on the free time in his calendar.

Once a booking is made, it automatically gets updated in the trainer's google calendar and that available time slot for booking disappears from the platform.

### Requirements

>- List available times to book which are taken from free space in the synced google calendar
>- Once a time is clicked to book, guide them through the booking process until confirmed
>- Have an informative website, displaying information about the different programs available and the instructor

----------

### Client Meeting

![Client Meeting](https://lh3.googleusercontent.com/-WlGPWZtgiHA/WTeDuCR3dII/AAAAAAAAAL4/FwBKI0n4D7EU8QMvIMITPfQGgZ6S6sTEACLcB/s800/FullSizeRender+%25285%2529.jpg "Client Meeting")

During the client meeting, the idea was discussed and notes were taken on requirements, design ideas and any other relevant information the client thought important. With this information, wireframes were created with a possible design flow for the platform.

----------

### Wireframes and Design

![Design](https://lh3.googleusercontent.com/-6Mti_9FqXbs/WTeELqBIKKI/AAAAAAAAAMA/gagMnC7B6f4k9eYw_NKaqdKR9Ke1uM9vwCLcB/s800/IMG_1533.JPG "Design")

My client has a few design ideas but was open to any changes suggested. The wireframes were used as a guideline but as the platform started coming together and styling started, a few changes were made to compliment the platform.

It was very important for my client to have a mobile friendly webpage. The homepage has two different homepage layouts depending on screen size. 
On a desktop there is a bigger image slider with javascript transitions and a greater effect.
On mobile the image sider switches to static 3 images side by side.
The rest of the platform is designed to be mobile friendly.

#### Design changes:

>- Instead of a picture as the heading on every page, the logo and brand name was chosen so that as soon as you go onto any page you see 'Grappling Education' with its logo and start to build brand recognition.
>- A 'Book Now' button on the home page was implemented instead of the whole booking form. The button allows a modal to pop up with the booking form, and there is a 'Bookings' tab in the navbar which renders a new page dedicated to just bookings.
>- The Instructor's fighter profile page is simple and has a 'fighter profile' youtube video. A possible later option is to include the instructor's CV.

----------

### Getting Started 

1 : Starting the node application with express:
```
express --view=handlebars GrapplingEducation
```
2 :  Researching ways to synch google calendar - APIs, npm packages etc
3 : Authentication using passport 
4 : Login options with facebook and google as well as normal login
5 : Mobile friendly design. Bootstrap framework used for styling.

----------

### Google Calendar Sync

I approached this task having two options.

##### **Option One**: 
Creating a booking platform using an external package to help with the process. As I needed to specifically have it synced with a google calendar due to my client having a rotating roster (every week available times would be different - no two weeks the same), I wanted to make sure at the end of two weeks I had something to show my client no matter what (if my coding from scratch method wouldn't be complete in time).
[Timekit](https://www.timekit.io/) allows API personalisation and widget calls to be made while easily synching any google calendars for one or more users. 
This is a key advantage to using this platform, as when my client wants to add more instructors to the booking platform, their calendars can easily be added and synced. 

https://github.com/timekit-io/booking-js

##### **Option Two**:
Using the [Google Calendar API](https://developers.google.com/google-apps/calendar/). This was/continues to be a big challenge for me. Using the [Quickstart](https://developers.google.com/google-apps/calendar/quickstart/nodejs) guide for node I managed to set up an API call to pull all events from my client's calendar. 
The challenge here was that you can only pull the busy times and not the free times; meaning functions had to be created to:

- create an array of freeTime which displays 1 hour time blocks every hour on the hour from 9am to 9pm
- create an array of busyTimes holding the information of events from the google API
- comparing these two events to each other for any conflicts and providing an array with only the non conflicting times which would be considered "free time" available to book.

----------

### Using Mocha and Chai to help write a function

I used mocha and chai to help write a function to getTimeSlots of one hour time blocks on the hour, every hour from 9 am to 9pm. I did this by first writing the test, which made writing a function to get the test's output much simpler to achieve as I had the mindset of "how do I write a function to give me the answer that the test is showing".

##### **Testing Code:**
```
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
```
##### **Function Code:**

```
function getTimeSlots(today, numDays) {

  let times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let slots = [];

  for (let i = 0; i < numDays; i++) {

    let dailySlots = times.map((time) => {
      let date = new Date(today.getTime());
      return {free: true, startTime: time, endTime: time+1, date: new Date(date.setDate(date.getDate()+i))}
    })
console.log(dailySlots)
    slots = slots.concat(dailySlots)
  }

  return slots;
} 
```

----------

### Platform

![Grappling Education](https://lh3.googleusercontent.com/-vbP6L0U47Ao/WTjPikqcE-I/AAAAAAAAANU/8iCVtjxBEPwL5vKZFtb6zgXlt_rZ3UVgQCLcB/s800/websitegif.gif "websitegif.gif")

![Booking Home Page](https://lh3.googleusercontent.com/-Zi79bCRNjeY/WTeVYK7ZPCI/AAAAAAAAAMc/jpN2CBIrn84z2RRStIE3OhbhVUWBqbkkwCLcB/s800/Screen+Shot+2017-06-07+at+3.51.40+pm.png "Screen Shot 2017-06-07 at 3.51.40 pm.png")

![Fighter Profile](https://lh3.googleusercontent.com/-YNh_AmK5uhQ/WTeVeVy3VqI/AAAAAAAAAMk/O7fLJ8arqlAcVyQvMmuO163uf9khFXSkQCLcB/s800/Screen+Shot+2017-06-07+at+3.52.06+pm.png "Screen Shot 2017-06-07 at 3.52.06 pm.png")

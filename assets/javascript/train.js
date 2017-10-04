// Initializing Firebase 
 var config = {
     apiKey: "AIzaSyBppBFjsiNGkGGPWeg5VGVHDzu3j1ZouuU",
     authDomain: "train-time-b745e.firebaseapp.com",
     databaseURL: "https://train-time-b745e.firebaseio.com",
     projectId: "train-time-b745e",
     storageBucket: "train-time-b745e.appspot.com",
     messagingSenderId: "593830366754"
 };
 
 firebase.initializeApp(config);
 
 var database = firebase.database();

// Button for adding new trains 
 $("#submit-trains").on("click", function(event) {
 
     event.preventDefault();

// Initial variables for storing user input
     var trainName = $("#train-name").val().trim();
     var destination = $("#destination").val().trim();
     var firstTrain = moment($("#first-train").val().trim(), "h:mm a").format("X");
     var frequency = moment($("#frequency").val().trim(), "m").format("X");

// Creates an empty object for storing in Firebase later
     var newTrain = {
         name: trainName,
         dest: destination,
         first: firstTrain,
         freq: frequency
     };

// Pushes the newTrain object to the database
     database.ref().push(newTrain);

// Clears all the input fields
     $("#train-name").val("");
     $("#destination").val("");
     $("#first-train").val("");
     $("#frequency").val("");
 });

// A 'snapshot' is taken of the current data state everytime a new HTML child is added, in this case, new table cells
 database.ref().on("child_added", function(childSnapshot, prevChildKey) {

     var trainName = childSnapshot.val().name;
     var destination = childSnapshot.val().dest;
     var firstTrain = childSnapshot.val().first;
     var frequency = childSnapshot.val().freq;

// Formatting for proper time display
     var firstTrainFormat = moment.unix(firstTrain).format("h:mm a");
     var frequencyFormat = moment.unix(frequency).format("m");

// Time calculations for determining when the next train is based on the first train time vs. frequency vs. current time
// and how many minutes away based on next train time vs. current time
     var diffCalc = moment().diff(moment.unix(firstTrain), "minutes");
     var minAway = moment().diff(moment.unix(firstTrain), "minutes") % frequencyFormat;
     var minCalc = moment(frequencyFormat - minAway, "m").format("m");
     var nextTrain = moment().add(minCalc, "minutes").format("h:mm a");

// New HTML tables rendered from the database
     $("#new-train-disp > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequencyFormat + "</td><td>" + nextTrain + "</td><td>" + minCalc + "</td></tr>");
 });
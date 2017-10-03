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
 
$("#submit-trains").on("click", function(event) {
     
	 event.preventDefault();
     
	 var trainName = $("#train-name").val().trim();
     var destination = $("#destination").val().trim();
     var firstTrain = moment($("#first-train").val().trim(), "hh:mm a").format("X");
     var frequency = moment($("#frequency").val().trim(), "mm").format("X");
     
	 var newTrain = {
         name: trainName,
         dest: destination,
         first: firstTrain,
         freq: frequency
     };
     
	 database.ref().push(newTrain);

     $("#train-name").val("");
     $("#destination").val("");
     $("#first-train").val("");
     $("#frequency").val("");
 });
 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

     var trainName = childSnapshot.val().name;
     var destination = childSnapshot.val().dest;
     var firstTrain = childSnapshot.val().first;
     var frequency = childSnapshot.val().freq;

     var firstTrainFormat = moment.unix(firstTrain).format("hh:mm a");
     var frequencyFormat = moment.unix(frequency).format("mm");
     
	 var diffCalc = moment().diff(moment.unix(firstTrain), "minutes");
     var minAway = moment().diff(moment.unix(firstTrain), "minutes") % frequencyFormat;
     var minCalc = moment(frequencyFormat - minAway, "mm").format("mm");
     var nextTrain = moment().add(minCalc, "minutes").format("hh:mm a");
     
	$("#new-train-disp > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequencyFormat + "</td><td>" + nextTrain + "</td><td>" + minCalc + "</td></tr>");
 });
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
     var firstTrain = $("#first-train").val().trim();
     var frequency = $("#frequency").val().trim();
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
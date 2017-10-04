# HW - {train-time-firebase}

## Live Link
 - https://mikes74.github.io/train-time-firebase/

## Add train destinations and time of first arrival to see when the next train is coming and how long you will have to wait for it. 

## Requirements
- Use Firebase to store and access a remote database
- Create JavaScript objects and variables for holding user input
- Use momment.js for time calculations
- Dynamically populate HTML tables from database snapshots 

## Technologies Used
- JavaScript for arrays, objects and functions
- Firebase database
- jQuery for DOM Manipulation
- Bootstrap for layout and style of HTML elements

## Code Explanation
HTML form inputs that add JavaScript variables & objects to push to a Firebase database using an onclick function. The "childSnapshot" function takes a 'snapshot' of the current data state everytime a new HTML child is added, in this case, new table cells. Time calculations are made using moment.js to determine what time trains arrive based on current time and user input. New HTML tables are rendered from each 'snapshot' of converted times and other info from the database.
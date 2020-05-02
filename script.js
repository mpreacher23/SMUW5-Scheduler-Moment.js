// variables calls for html
let timeBlocks = $(".time-block");
let textAreas = $(".textarea");
let timeRows = $("#timesheet div");
let hours = $(".hour");

let getCurrentTime = function () {
    return moment().clone();
}
// function for the current date
let postDisplayDate = function () {
    var dateString = getCurrentTime().format('dddd, MMMM Do');
    $("#currentDay").text(dateString);
}
// render for objects in timeblocks
let renderTimeBlocks = function () {
    var currentHour = parseInt(getCurrentTime().format('H'));
    var dayPlannerObject = getDayPlannerObject();
    // hours
    hours.each((index, hour) => {
        hour = hours[index];

        let timeInt;
        if (hour.textContent.includes("PM")) {
            timeInt = parseInt(hour.textContent.replace("PM", ""))
            if (timeInt !== 12) {
                timeInt += 12;
            }
        } else {
            timeInt = parseInt(hour.textContent.replace("AM", ""));
        }
        timeblock = timeBlocks[index];
        if (currentHour > timeInt) {
            //past
            $(timeblock).removeClass("past present future").addClass("past");
        } else if (currentHour === timeInt) {
            //current
            $(timeblock).removeClass("past present future").addClass("present");
        } else {
            //future
            $(timeblock).removeClass("past present future").addClass("future");
        }

        //set the text inside the textarea of the timeblock based on whats in the dayPlannerObject
        $(timeblock).children("textarea").val(dayPlannerObject[hour.textContent])

    });
}
// saveBtn function for timeblocks
let saveTimeBlockText = function () {

    var row = $(this).parent(".row");
    dayPlannerObject = getDayPlannerObject();
    var hour = row.children(".hour").text();
    dayPlannerObject[hour] = row.children(".time-block").children("textarea").val();
    storeDayPlannerObject(dayPlannerObject);
}
$(".saveBtn").on("click", saveTimeBlockText);

let OnInit = function () {
    postDisplayDate();
    renderTimeBlocks();
};

// storage function for local., note you have to clear cache in browswer to clear. 
let getDayPlannerObject = function () {
    var dayPlannerObject = JSON.parse(localStorage.getItem("dayPlannerObject"));
    if (dayPlannerObject === null) {
        dayPlannerObject = {};
    }
    return dayPlannerObject;
}
let storeDayPlannerObject = function (dayPlannerObject) {
    localStorage.setItem("dayPlannerObject", JSON.stringify(dayPlannerObject));
}
OnInit();
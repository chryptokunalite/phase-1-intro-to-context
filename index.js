// CREATE EMPLOYEE RECORD FROM ARGUMENT OF ARRAY INTO OBJECT
function createEmployeeRecord(employeeRecordArray){
// CREATE OBJECT, THE TEST SPECIFICALLY WANTED THE Oth, 1th, 2th element TO HOLD THE SPECIFIC VARIABLES THIS WAS MY 6th ATTEMPT
let employeeRecordObject = {
    firstName: employeeRecordArray[0], 
    familyName: employeeRecordArray[1], 
    title: employeeRecordArray[2], 
    payPerHour: employeeRecordArray[3], 
    timeInEvents: [], 
    timeOutEvents: []
}; 
console.log(employeeRecordObject)
return employeeRecordObject
}
// CHECK WORK
let johnRecord = createEmployeeRecord(['John', 'Doe', 'manager', 20] )

// CREATE ARRAY OF ARRAYS: EMPLOYEE RECORDS USING createEmployeeRecord()
function createEmployeeRecords(nestedArray){

let arrayOfObjects = nestedArray.map(createEmployeeRecord); 
console.log(arrayOfObjects); 
return arrayOfObjects; 
}
//TAKE AN EMPLOYEE RECORD AND CREATE A TIME-IN EVENT AS AN OBJECT THAT IS PUSHED TO THE ARRAY timeInEvents: [] WITHIN THE EMPLOYEE RECORD
function createTimeInEvent(employeeRecord, clockIn){
const [dayIn ,hourIn] = clockIn.split(' ')

let timeInObject = {
    type: "TimeIn", 
    hour: parseInt(hourIn), 
    date: dayIn
}

employeeRecord.timeInEvents.push(timeInObject); 
return employeeRecord; 
}
createTimeInEvent(johnRecord, '2024-12-23 0900')

//TAKE AN EMPLOYEE RECORD AND CREATE A TIME-OUT EVENT AS AN OBJECT THAT IS PUSHED TO THE ARRAY timeOutEvents: [] WITHIN THE EMPLOYEE RECORD
function createTimeOutEvent(employeeRecord, clockOut){
    const [dayOut ,hourOut] = clockOut.split(' ')
    
    let timeOutObject = {
        type: "TimeOut", 
        hour: parseInt(hourOut), 
        date: dayOut
    }
    
    employeeRecord.timeOutEvents.push(timeOutObject); 
    return employeeRecord; 
    }
    createTimeOutEvent(johnRecord, '2024-12-23 1100')

//GET AN EMPLOYEE'S HOURS WORKED BY ACCESSING THE OBJECT NESTED WITHIN THE ARRAYS timeInEvents: [],  timeOutEvents: []  IN THE EMPLOYEE RECORD OBJECT
function hoursWorkedOnDate(employeeRecord, dayWorked){
    const dayIn = employeeRecord.timeInEvents.find(element => element.date === dayWorked); 
    const dayOut = employeeRecord.timeOutEvents.find(element => element.date === dayWorked); 
    let hourDayIn = dayIn.hour
    let hourDayOut = dayOut.hour
  
    let totalHoursWorked = hourDayOut - hourDayIn
        if (totalHoursWorked > 900){
            totalHoursWorked = parseInt(totalHoursWorked.toString().substring(0,2));
            // totalHoursWorked = parseInt(totalHoursWorked) I didn't realize I could use parseInt() 
        } else {
            totalHoursWorked = parseInt(totalHoursWorked.toString().substring(0,1)); 
            // totalHoursWorked = parseInt(totalHoursWorked)
        }
return totalHoursWorked
}
//CHECK WORK
hoursWorkedOnDate(johnRecord, '2024-12-23')

//CALCULATE WAGES EARNED ON A GIVEN DAY BY PASSING THE EMPLOYEE RECORD AND DATE THROUGH hoursWorkedOnDate(), AND MULTIPLYING THE HOURS WORKED BY THE PAY RATE IN THE EMPLOYEE RECORD OBJECT
function wagesEarnedOnDate(employeeRecord, dayWorked){
  const payRate = employeeRecord.payPerHour
  const hoursForDay = hoursWorkedOnDate(employeeRecord,dayWorked)
  console.log(payRate)
  console.log(hoursForDay)

  let wagesEarned = payRate * hoursForDay
  console.log(wagesEarned)
return wagesEarned
}
wagesEarnedOnDate(johnRecord, '2024-12-23')

//CALCULATE ALL WAGES FOR EMPLOYEE BY USING ONLY THE TIME-OUT DATE AS A REFERENCE FOR A DAY THAT WAS WORKED, THE TIME-OUT EVENTS ARRAY OF OBJECTS IS ITERATED OVER USING forEach(), IN THE forEach
//WE GRAB EACH DATE AND DECLARE IT TO THE VARIABLE dateWorked, THEN PASS THE EMPLOYEE RECORD AND dateWorked AS ARGUMENTS TO THE wagesEarnedOnDate() FUNCTION, AND FOR EACH WAGES FOR DATE CALCULATED
//WE ADD IT INTO THE totalWages VARIABLE (initalized as 0) this one was simpler than I thought and I could not remember how to properly use forEach() in this instance
function allWagesFor(employeeRecord){
let totalWages = 0; 
employeeRecord.timeOutEvents.forEach(element => {
    const dateWorked = element.date; 
    const wagesForDate = wagesEarnedOnDate(employeeRecord, dateWorked); 
    totalWages += wagesForDate; 
})
console.log(totalWages)
return totalWages
}
allWagesFor(johnRecord)

//
function calculatePayroll(arrayOfEmployees){
let totalPayRoll = 0; 

    arrayOfEmployees.forEach(employee => {
    const allWages = allWagesFor(employee)
    totalPayRoll += allWages; 
})
return totalPayRoll
}




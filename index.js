// Your code here


function employeeObjectTemplate(employeeArray){
    this.firstName = employeeArray[0],
    this.familyName = employeeArray[1],
    this.title = employeeArray[2],
    this.payPerHour = employeeArray[3],
    this.timeInEvents = [],
    this.timeOutEvents = []
}

function createEmployeeRecord (employeeArray) {
    return new employeeObjectTemplate(employeeArray);
}


function createEmployeeRecords (recordsIn){
   return recordsIn.map(createEmployeeRecord)
}


function createTimeInEvent(employeeRecord, dateStamp){
        employeeRecord.type="TimeIn"; 
        let stamp=dateStamp.split(" ");
        let event = {
            type:"TimeIn",
            date:employeeRecord.timeInEvents.date=stamp[0],
            hour:employeeRecord.timeInEvents.hour=parseInt(stamp[1]),
        }
        employeeRecord.timeInEvents.push(event);
        return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){
    employeeRecord.type="TimeOut"; 
    let stamp=dateStamp.split(" ");
    let event = {
        type:"TimeOut",
        date:employeeRecord.date=stamp[0],
        hour:employeeRecord.hour=parseInt(stamp[1]),
    }
    employeeRecord.timeOutEvents.push(event);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateString){
    let timeIn;
    let timeOut;
    for (let i of employeeRecord.timeInEvents){
        if(i.date === dateString){
               timeIn = parseInt(i.hour);
        }
    }
    for (let i of employeeRecord.timeOutEvents){
        if(i.date === dateString){
               timeOut = parseInt(i.hour);
        }
    }
    
    let hoursWorked = timeOut-timeIn;
    return hoursWorked/100;
}

function wagesEarnedOnDate(employeeRecord, dateString){
    //returns Pay Owed
    let hours = hoursWorkedOnDate(employeeRecord, dateString);
    let wagesOwed = employeeRecord.payPerHour*hours;
    return(wagesOwed);
}

function allWagesFor(employeeRecord){
   let totalWagesArr = [];
   for (let i of employeeRecord.timeInEvents){
       totalWagesArr.push(wagesEarnedOnDate(employeeRecord, i.date));
   }    
        let x = totalWagesArr.reduce(
            (acc, elem)=>acc + elem, 0
            );
            return x;
} 


function calculatePayroll(employeeArray){
    let payroll=[];
    for (let i of employeeArray){
        payroll.push(allWagesFor(i))
        console.log(allWagesFor(i));
    }
    let totalBurden= payroll.reduce((acc, elem)=> acc + elem,0);
    return totalBurden;
}


//----------------------
// // let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
// // createTimeInEvent(bpRecord, "2014-02-28 1400")


// // let bpRecord2 = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
// // createTimeOutEvent(bpRecord, "2015-02-28 1700")

// // cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
// //         updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// //         updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")

//         cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
//         // // Earns 324
//         createTimeInEvent(cRecord, "0044-03-14 0900")
//         createTimeOutEvent(cRecord, "0044-03-14 2100")
//         // // Earns 54
//         createTimeInEvent(cRecord, "0044-03-15 0900")
//         createTimeOutEvent(cRecord, "0044-03-15 1100")



let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
let sRecord = createEmployeeRecord(["Simba", "", "King", 100])  

let sTimeData = [
    ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
    ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
  ]

  let rTimeData = [
    ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
    ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
  ]

  sTimeData.forEach(function (d) {
    let [dIn, dOut] = d
    sRecord = createTimeInEvent(sRecord, dIn)
    sRecord = createTimeOutEvent(sRecord, dOut)
  })

  rTimeData.forEach(function (d, i) {
    let [dIn, dOut] = d
    rRecord = createTimeInEvent(rRecord, dIn)
    rRecord = createTimeOutEvent(rRecord, dOut)
  })

  calculatePayroll([rRecord, sRecord]);



// Your code here
function createEmployeeRecord(employeeArr) {
    return {
        firstName: employeeArr[0],
        familyName:employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArr) {
    return employeeArr.map(rec => createEmployeeRecord(rec))
}

function createTimeInEvent(empArr, dateStamp) {
    const dateArr = dateStamp.split(" ")
    const date = dateArr[0]
    const hour = dateArr[1]
    const timeInObj = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date,
    }
    empArr.timeInEvents.push(timeInObj)
    return empArr
}

function createTimeOutEvent(empArr, dateStamp) {
    const dateArr = dateStamp.split(" ")
    const date = dateArr[0]
    const hour = dateArr[1]
    const timeOutObj = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date,
    }
    empArr.timeOutEvents.push(timeOutObj)
    return empArr
}

function hoursWorkedOnDate(empArr, targetDate) {
    const inEvent = empArr.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = empArr.timeOutEvents.find(outEvent => outEvent.date === targetDate)
    return parseInt(outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(empArr, targetDate) {
    return hoursWorkedOnDate(empArr, targetDate) * empArr.payPerHour
}

function allWagesFor(empArr) {
    let allPay = []
    let allDates= []
    for(let i = 0; i< empArr.timeInEvents.length; i++) {
        allDates.push(empArr.timeInEvents[i].date)
    }
    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(empArr, date))
    })

    return allPay.reduce((previousValue, currentValue) => previousValue + currentValue)
}

function calculatePayroll(empArr) {
    let payroll = []
    empArr.forEach(employee => {
        payroll.push(allWagesFor(employee))
    })
    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}
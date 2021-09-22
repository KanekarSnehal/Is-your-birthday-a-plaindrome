const birthDateInput = document.querySelector("#birthdate-input");
const button = document.querySelector("#button");
const output = document.querySelector("#output");
const errorOutput = document.querySelector("#error-output");

button.addEventListener("click", clickHandler);


function clickHandler() {
    var bdayStr = birthDateInput.value;

    if (bdayStr !== '') {
        var listOfDates = bdayStr.split('-');
        var date = {
            day: Number(listOfDates[2]),
            month: Number(listOfDates[1]),
            year: Number(listOfDates[0]) //as year is shown first
        };


        var checkPalindrome = checkPalindromeForAllDateFormats(date);

        if (checkPalindrome) {
            output.innerText = "processing....";
            setTimeout(function () {
                output.innerText = "Yay!! your birthday is a palindrome!! 🎉🎉";
            }, 3000);
        } else {
            var [ctr, nextDate] = getNextPalindromeDate(date);

            output.innerText = "processing....";
            setTimeout(function () {
                output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 💔`;
            }, 2000)

        }


        errorOutput.style.display = "none";
        output.style.display = "block";
    } else {
        output.style.display = "none";
        errorOutput.style.display = "block";
        errorOutput.innerText = "**Please select date first**";
    }
}

function reverseStr(str) {
    var ListOfChars = str.split('');
    var reverseListOfChars = ListOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');

    return reversedStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}


function convertDateToStr(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}


function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}



function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}


function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) //check for feb
    {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }

    }
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}


function getNextPalindromeDate(date) {
    var ctr = 0
    var nextDate = getNextDate(date)

    while (1) {
        ctr++;
        var flag = checkPalindromeForAllDateFormats(nextDate);
        if (flag) {
            break;
        }
        nextDate = getNextDate(nextDate)
    }

    return [ctr, nextDate]
}



//console.log(getPreviousDate(date))
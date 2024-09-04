/*Create a function that gives a personalized greeting. This function takes two parameters: name and owner.

Use conditionals to return the proper message:

case    return
name equals owner    'Hello boss'
otherwise    'Hello guest'*/
function greet(name, owner) {
  
    if (name === owner) {
        return 'Hello boss';
    } else {
        return 'Hello guest';
    }
}
const name = 'Ali';
const owner = 'Maga';
console.log(greet(name, owner));


/*For example: month 2 (February), is part of the first quarter; month 6 (June), is part of the second quarter; and month 11 (November), is part of the fourth quarter. */
function getQuarter(month) {
    if (month >= 1 && month <= 3) {
        return 'First Quarter (Q1)';
    } else if (month >= 4 && month <= 6) {
        return 'Second Quarter (Q2)';
    } else if (month >= 7 && month <= 9) {
        return 'Third Quarter (Q3)';
    } else if (month >= 10 && month <= 12) {
        return 'Fourth Quarter (Q4)';
    } else {
        return 'Invalid month';
    }
}
console.log(getQuarter(2)); 
console.log(getQuarter(6)); 



/*Fellow code warrior, we need your help! We seem to have lost one of our sequence elements, and we need your help to retrieve it!

Our sequence given was supposed to contain all of the integers from 0 to 9 (in no particular order), but one of them seems to be missing.

Write a function that accepts a sequence of unique integers between 0 and 9 (inclusive), and returns the missing element.

Examples:
[0, 5, 1, 3, 2, 9, 7, 6, 4] --> 8
[9, 2, 4, 5, 7, 0, 8, 6, 1] --> 3 */

function findMissingElement(sequence) {
    const totalSum = 45;
    const sequenceSum = sequence.reduce((acc, num) => acc + num, 0);
    const missingElement = totalSum - sequenceSum;
    return missingElement;
}
console.log(findMissingElement([0, 5, 1, 3, 2, 9, 7, 6, 4]));
console.log(findMissingElement([9, 2, 4, 5, 7, 0, 8, 6, 1]));
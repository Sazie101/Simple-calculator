'use strict';

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
    return[...parent.querySelectorAll(selector)];
}

function create(element, parent = document) {
    return parent.createElement(element);
}

function print(...args) {
    console.log(args.join(', '));
}

const equal = select('.equal');
const display = selectById('display');
const ac = select('.AC');
const de = select('.DE');
const numbers = selectAll('.number');
const operations = selectAll('.operation');


onEvent('load', window, () => {
    display.value = '';
});

onEvent('click', ac, () => {
    display.value = '';
});

onEvent('click', de, function deleteNum() {
    display.value = display.value.toString().slice(0,-1);
});

numbers.forEach(number => {
    onEvent('click', number, () => {
        let value = number.value;
        display.value += value;
    });
});

operations.forEach(operation => {
    onEvent('click', operation, () => {
        display.value += operation.value;
    });
});

function checkArray(str, arr) {
    let count = 0;

    for (let i = 0; i< str.length; i++) {
        if (arr.includes(str[i])) {
            count++;
        }
    }
    if (count === 1) {
        const newArr = arr.filter(char => str.includes(char));
        return newArr;
    } else if (count > 1) {
        alert('You can only have 1 operation');
        display.value = '';
    } else {
        alert('You need to have an operation');
        display.value = '';
    }
    
}

onEvent('click', equal, () => {
    const operationsArr = ['+', '-', '*'];
    let value = display.value;
    const opArr = checkArray(value, operationsArr);
    let opIndex = value.indexOf(opArr[0]);
    let firstNum = parseFloat(value.slice(0,opIndex));
    let secondNum = parseFloat(value.slice(opIndex+1, ));
    let result;
    let op = opArr[0];
    switch (op) {
        case "+":
            result = firstNum + secondNum;
            break;
        case "-":
            result = firstNum - secondNum;
            break;
        default:
            result = firstNum * secondNum;
            break;
    }
        display.value = result;
});
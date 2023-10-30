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
const display1 = selectById('display1');
const display2 = selectById('display2');
const display3 = selectById('display3');
const ac = select('.AC');
const de = select('.DE');
const numbers = selectAll('.number');
const operations = selectAll('.operation');


onEvent('load', window, () => {
    display1.value = '';
    display2.value = '';
    display3.value = '';
    display3.style.color = '#3b4454';
});

onEvent('click', ac, () => {
    display1.value = '';
    display2.value = '';
    display3.value = '';
    location.reload();
});

onEvent('click', de, function deleteNum() {
    display1.value = display1.value.toString().slice(0,-1);
});

numbers.forEach(number => {
    onEvent('click', number, () => {
        let value = number.value;
        display1.value += value;
    });
});

operations.forEach(operation => {
    onEvent('click', operation, () => {
        display3.value = operation.value;
        numbers.forEach(number => {
            onEvent('click', number, () => {
                let value = number.value;
                display2.value += value;
                display1.value = display1.value.toString().slice(0,-1)
            });
        });
    });
});

onEvent('click', equal, function getAnswer(value) {
    let firstNum = parseFloat(display1.value);
    let secondNum = parseFloat(display2.value);
    let operation = display3.value;
    display3.style.color = '#fff';
    if (operation === '+') {
        let answer = firstNum + secondNum;
        display3.value = (answer).toFixed(2);
    } else if (operation === '-') {
        let answer = firstNum - secondNum;
        display3.value = (answer).toFixed(2);
    } else if (operation === '*') {
        let answer = firstNum * secondNum;
        display3.value = (answer).toFixed(2);
    } else if (operation === '/') {
        let answer = firstNum / secondNum;
        display3.value = (answer).toFixed(2);
    }
});
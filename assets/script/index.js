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

function create(element, parent = document) {
    return parent.createElement(element);
}

function print(...args) {
    console.log(args.join(', '));
}

let points = 0;
const scoreDisplay = selectById('score');
const userAnswer = selectById('userAnswer');
const question = selectById('question');
const submit = selectById('submit');
const timerDisplay = selectById('timer');
scoreDisplay.innerText = `score: ${points}`;
const opArr = ['+', '-', '*'];

function generateQuestion() {
    let randNum1 = Math.ceil(Math.random()*10);
    let randNum2 = Math.ceil(Math.random()*10);
    let randOp = Math.floor(Math.random() * opArr.length);
    question.innerText = `${randNum1} ${opArr[randOp]} ${randNum2}`;
    return { randNum1, randNum2, randOp };
}

let { randNum1, randNum2, randOp } = generateQuestion();

let remainingTime = 5;
let checkTime;

function checkAnswer() {
    remainingTime = 5;
    let answer = parseFloat(userAnswer.value);
    let result;

    switch (opArr[randOp]) {
        case "+":
            result = randNum1 + randNum2;
            break;
        case "-":
            result = randNum1 - randNum2;
            break;
        default:
            result = randNum1 * randNum2;
            break;
    }

    if (result === answer) {
        points++;
    } else if (points > 0){
        points--;
    }

    userAnswer.value = '';
    scoreDisplay.innerText = `score: ${points}`;

    ({ randNum1, randNum2, randOp } = generateQuestion());
}

function timerFunction() {
    remainingTime--;
    timerDisplay.innerText = `Time: ${remainingTime} sec`;

    if (remainingTime === 0) {
        clearInterval(checkTime);
        checkAnswer();
        checkTime = setInterval(timerFunction, 1000);
    }
}

checkTime = setInterval(timerFunction, 1000);

onEvent('click', submit, (event) => {
    event.preventDefault();
    clearInterval(checkTime);
    checkAnswer();
    checkTime = setInterval(timerFunction, 1000);
});
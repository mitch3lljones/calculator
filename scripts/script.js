const operators = ["add", "subtract", "multiply", "divide"];
const buttons = document.querySelectorAll("button");
const display = document.getElementById("display-text");
const expression = document.getElementById("expression");

let expressionText = [];
let operatorButtonPressed = false;

buttons.forEach(function(button) {
    button.onclick = function() {
        switch (button.textContent) {
            case "AC":
                clearAll();
                break;
            case "DEL":
                backspace();
                break;
            case ".":
                insertDot();
                break;
            case "±":
                changeSign();
                break;
            case "+":
            case "-":
            case "×":
            case "÷":
                editExpression(button.textContent);
                break;
            case "0":
                insertZero(button.textContent);
                break;
            case "=":
                calculateResults();
                break;
            default:
                insertDigit(button.textContent);
                break;
        }
    }
})

function clearAll() {
    display.textContent = "";
    expression.textContent = "";
    operatorButtonPressed = false;
    expressionText = [];
}

function backspace() {
    if (display.textContent.length < 2 || display.textContent == "0." ||(display.textContent.length < 3 && display.textContent.includes("-"))){
        display.textContent = "";
    }
    else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function insertDot() {
    if (display.textContent == "") {
        display.textContent = "0.";
    }
    else if (!display.textContent.includes(".")) {
        display.textContent = display.textContent + ".";
    }
}

function changeSign() {
    if (display.textContent == "0" || display.textContent == ""){
        return;
    }
    else {
        if (display.textContent.includes("-")) {
            display.textContent = display.textContent.replace("-","");
        }
        else {
            display.textContent = "-" + display.textContent;
        }
    }
}

function editExpression(operator) {
    operator = operator == "×" ? "*" : operator;
    operator = operator == "÷" ? "/" : operator;
    
    if(operatorButtonPressed) {
        expression[expression.length - 1] = operator;
    }
    else if (display.textContent != "") {
        expressionText.push(display.textContent);
        expressionText.push(operator);
        operatorButtonPressed = true;
    }
    expression.textContent = expressionText.join(" ");
}

function insertZero(text) {
    let allZeros = true;
    if (/[1-9]/.test(display.textContent)) {
        allZeros = false;
    }
    
    if (!allZeros || display.textContent.includes(".") || display.textContent == "") {
        insertDigit(text);
    }
    else {
        return;
    }
}

function insertDigit(text) {
     if (operatorButtonPressed) {
        display.textContent = ""; // start new digit
        operatorButtonPressed = false;
    }
    
    if (display.textContent == "0") {
        display.textContent = text;
    }
    else {
        display.textContent = display.textContent + text;
    }
}

function calculateResults() {
    if (operatorButtonPressed) {
        expressionText = expressionText.slice(0, -1);
    }
    else {
        expressionText.push(display.textContent);
    }
    
    let result = eval(expressionText.join(''));
    
    if(!Number.isInteger(result)) {
        result = result.toFixed(6);
    }
    
    display.textContent = result;
    expression.textContent = expressionText.join(" ") + "=";
    operatorButtonPressed = false;
    expressionText = [];
}

function add (num1, num2) {
	return (num1 + num2);
}

function subtract (num1, num2) {
	return (num1 - num2);
}

function multiply (num1, num2) {
    return (num1 * num2);
}

function divide (num1, num2) {
    if(num1 == 0 || num2 == 0) {
        alert("YOU CAN\'T DIVIDE BY 0 👎")
    }
    return (num1 / num2);
}

function operate(operator, num1, num2) {
    if(operators.indexOf(operator) == -1) {
        return "ERROR";
    }
    else {
        if(operator == operators[0]) {
            return add(num1, num2);
        }
        else if (operator == operators[1]) {
            return subtract(num1, num2);
        }
        else if (operator == operators[2]) {
            return multiply(num1, num2);
        }
        else {
            return divide(num1, num2);
        }
    }
}

/*console.log(add(23,45));
console.log(operate("add", 23, 45));
console.log(subtract(23,45));
console.log(operate("subtract", 23, 45));
console.log(multiply(23,45));
console.log(operate("multiply", 23, 45))
console.log(divide(23,45));
console.log(operate("divide", 23, 45));*/
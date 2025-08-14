let input = document.getElementById("inputBox");
let equation = document.getElementById("equation");
let buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let previousInput = "";
let equationText = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let buttonValue = e.target.innerHTML;

        if (buttonValue == 'AC') {
            currentInput = "";
            previousInput = "";
            operator = "";
            equationText = "";
            input.value = "0";
            equation.textContent = "";
        }
        else if (buttonValue == 'DEL') {
            currentInput = currentInput.slice(0, -1);
            input.value = currentInput || "0";
        }
        else if (buttonValue == '%') {
            if (currentInput) {
                equationText += currentInput + "%";
                currentInput = (parseFloat(currentInput) / 100).toString();
                input.value = currentInput;
                equation.textContent = equationText;
            }
        }
        else if (buttonValue == '=') {
            if (previousInput && operator && currentInput) {
                equationText += currentInput + " =";
                let result;
                switch (operator) {
                    case '+':
                        result = parseFloat(previousInput) + parseFloat(currentInput);
                        break;
                    case '-':
                        result = parseFloat(previousInput) - parseFloat(currentInput);
                        break;
                    case 'x':
                        result = parseFloat(previousInput) * parseFloat(currentInput);
                        break;
                    case '/':
                        if (parseFloat(currentInput) === 0) {
                            input.value = "Error";
                            equation.textContent = equationText.slice(0, -2) + "Error";
                            currentInput = "";
                            previousInput = "";
                            operator = "";
                            equationText = "";
                            return;
                        }
                        result = parseFloat(previousInput) / parseFloat(currentInput);
                        break;
                }
                currentInput = result.toString();
                input.value = currentInput;
                equation.textContent = equationText;
                previousInput = "";
                operator = "";
                equationText = "";
            }
        }
        else if (['+', '-', 'x', '/'].includes(buttonValue)) {
            if (currentInput) {
                if (previousInput && operator) {
                    let result;
                    switch (operator) {
                        case '+':
                            result = parseFloat(previousInput) + parseFloat(currentInput);
                            break;
                        case '-':
                            result = parseFloat(previousInput) - parseFloat(currentInput);
                            break;
                        case 'x':
                            result = parseFloat(previousInput) * parseFloat(currentInput);
                            break;
                        case '/':
                            result = parseFloat(previousInput) / parseFloat(currentInput);
                            break;
                    }
                    currentInput = result.toString();
                    input.value = currentInput;
                    equationText = currentInput + " " + buttonValue + " ";
                } else {
                    equationText = currentInput + " " + buttonValue + " ";
                }
                previousInput = currentInput;
                operator = buttonValue;
                currentInput = "";
                equation.textContent = equationText;
            }
        }
        else if (buttonValue == '.') {
            if (!currentInput.includes('.')) {
                currentInput += buttonValue;
                input.value = currentInput;
            }
        }
        else {
            currentInput += buttonValue;
            input.value = currentInput;
        }
    });
});

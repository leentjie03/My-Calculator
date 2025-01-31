// Getting the input and button elements
let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let previousInput = "";

// Adding event listeners to the buttons
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let buttonValue = e.target.innerHTML;

        // AC Button - Clear input
        if (buttonValue == 'AC') {
            currentInput = "";
            previousInput = "";
            operator = "";
            input.value = "0";
        }

        // DEL Button - Remove last character
        else if (buttonValue == 'DEL') {
            currentInput = currentInput.slice(0, -1);
            input.value = currentInput || "0";
        }

        // Percentage Button - Calculate percentage
        else if (buttonValue == '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            input.value = currentInput;
        }

        // Equals Button - Perform calculation
        else if (buttonValue == '=') {
            if (previousInput && operator && currentInput) {
                switch (operator) {
                    case '+':
                        currentInput = (parseFloat(previousInput) + parseFloat(currentInput)).toString();
                        break;
                    case '-':
                        currentInput = (parseFloat(previousInput) - parseFloat(currentInput)).toString();
                        break;
                    case 'x':
                        currentInput = (parseFloat(previousInput) * parseFloat(currentInput)).toString();
                        break;
                    case '/':
                        if (currentInput == "0") {
                            input.value = "Error";
                            return;
                        }
                        currentInput = (parseFloat(previousInput) / parseFloat(currentInput)).toString();
                        break;
                }
                input.value = currentInput;
                previousInput = "";
                operator = "";
            }
        }

        // Operator Button - Store the current input and operator for calculation
        else if (['+', '-', 'x', '/'].includes(buttonValue)) {
            if (currentInput) {
                previousInput = currentInput;
                operator = buttonValue;
                currentInput = "";
            }
        }

        // Number or Decimal Button - Append to current input
        else {
            currentInput += buttonValue;
            input.value = currentInput;
        }
    });
});

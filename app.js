// /*-------------------------------- Constants --------------------------------*/

// /*------------------------ Cached Element References ------------------------*/


const buttons = document.querySelectorAll('.button'); // Define buttons element
const display = document.querySelector('.display'); // Define display element

// /*-------------------------------- Variables --------------------------------*/


let firstOperand = ''; // Stores the first thing in calculator
let operator = ''; // stores the operator
let waitingForSecondOperand = false; // indicates whether the cal is waiting for the 2nd thing in calculator

// /*----------------------------- Event Listeners -----------------------------*/



buttons.forEach((button) => {  // iterates over each button element
  button.addEventListener('click', (event) => { // adds a click event listener to each button
    
    console.log(event.target.innerText); // Log the clicked button's text content

    if (event.target.classList.contains('number')) {  // check if the clicked element has the class number
      if (waitingForSecondOperand) { // check if the cal is waiting for the 2nd operand
        display.textContent = event.target.innerText; // load the event inner text to the display
        waitingForSecondOperand = false; // indicating that the second operand input is now complete
      } else { //if calculator is not waiting for the 2nd operator
        display.textContent = display.textContent + event.target.innerText;
        // takes the currently shown display and adds the number from the button you pressed. then shows the combined number on the screen
      }
    }

    if (event.target.classList.contains('operator')) { // checks if the clicked button belongs to the operator class

      if (operator && !waitingForSecondOperand) { // checks if there's already an operator & we are not waiting for the 2nd number
        const result = calculate(parseFloat(firstOperand), parseFloat(display.textContent), operator); // calculate the result using the previous operatorm, first operand and the current display value and operator)
        display.textContent = result;  //update the display to show the result.      // parseFloat converts the string text into a number with decimals
        firstOperand = result; // store the result as the new first operand for future calculations
      } else {
        firstOperand = display.textContent; // if there no opertor and we waiting for the 2nd number then store the current display as the first operand.
      }

      operator = event.target.innerText; // get the text of the clicked operator button
      waitingForSecondOperand = true; // we are waiting for the 2nd number input
    }

    if (event.target.classList.contains('equals')) { // checks if the clicked button is equals
      const result = calculate(parseFloat(firstOperand), parseFloat(display.textContent), operator); // calculate the result using the first operand and current display value and operator
      display.textContent = result; //show the result on the display.
      firstOperand = result; //show the result as the new first operand for future calculations
      operator = ''; // reset the operator to empty, because calculation is complete
      waitingForSecondOperand = false; // we are no longer waiting for the second number
    }

    if (event.target.innerText === 'C') { //checks if the clicked button has the text C 
      display.textContent = ''; // CLEAR everything from the display screen
      firstOperand = ''; // reset the first operand to an empty valye
      operator = ''; // CLEAR any operator that is selected
      waitingForSecondOperand = false; // Reset the calculator to not wait for a second number
    }
  });
});
/*-------------------------------- Functions --------------------------------*/

function calculate(num1, num2, operator) { // Function to perform calculation
  switch (operator) { //check which operator /*-+ was chosen.
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':                               // if the operators is / * - + then return ....
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      return num2;   // if no valid operator is provided, return num2 as answer.
  }
}



// Constructor Class
class Calculator {
    constructor(previousDisplayText, currentDisplayText){
        this.previousDisplayText = previousDisplayText;
        this.currentDisplayText = currentDisplayText;
        this.allClear();
    }

    // Constructor Functions
// Clearing The Display
allClear() {
    this.currentDisplay = '0';
    this.previousDisplay = '';
    this.operation = undefined;
}


// Capturing Our Numbers
appendNumber(number) {
    // Prevent repetition of decimals
    if(number === '.' && this.currentDisplay.includes('.')) return
    
    // Containing the length of our numbers within the display
    if(this.currentDisplay.length === 13) {
        return
    } else {
        this.currentDisplay = this.currentDisplay.toString() + number.toString();
    } 
}


// Working on the operations and setting values to variables
selectOperation(operation) {
    // running a check on our displays before performing math operations
    if(this.currentDisplay === '') return
    if(this.previousDisplay !== '') {
        this.evaluate()
    }
    this.operation = operation;
    this.previousDisplay = this.currentDisplay
    this.currentDisplay = ''
}


// function that performs math operations
evaluate() {
    // parse my string to numbers for evaluation
    let evaluation 
    const first = parseFloat(this.previousDisplay);
    const second = parseFloat(this.currentDisplay)
    // running a check if both variables contains numbers
    if(isNaN(first) || isNaN(second)) return
    // switching between operations
    switch(this.operation) {
        case '+': 
        evaluation = first + second;
        break;

        case '-': 
        evaluation = first - second;
        break;

        case '×': 
        evaluation = first * second;
        break;

        case '÷': 
        evaluation = first / second;
        break;

        default:
            break;
    }
    // format floating point values to a specified length
    if(evaluation.toString().length > 10) {
        this.currentDisplay = evaluation.toPrecision(10);
    } 
    else {
        this.currentDisplay = evaluation;
    }
    this.operation = undefined;
    this.previousDisplay = ''
}


// working on decimal values 
getDisplayNumber(number) {
    // splitting the number into its integer and decimal digits
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1];
    // integer digits
    let integerDisplay;
    if(isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        // including commas for lengthy integers and not with decimals
        integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }
    // decimal digits
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    }else {
        return integerDisplay;
    }
}


// updating the display content 
updateDisplay() { 
    //current display
    this.currentDisplayText.innerText = this.getDisplayNumber(this.currentDisplay);

    //previous display
    if(this.operation != null) {
        // include both number and operation to the display
        this.previousDisplayText.innerText = `${this.getDisplayNumber(this.previousDisplay)} ${this.operation}`;
    
    } else {
        // sets the previous display to none on-click of the equals button
        this.previousDisplayText.innerText = '';
    }
    
}

}


// Targetting the DOM Content
const btnNumbers = document.querySelectorAll('.btn-numbers');

const btnOperations = document.querySelectorAll('.btn-operations');

const clear = document.querySelector('#clear');

const equals = document.querySelector('#equals')

const previousDisplayText = document.querySelector('.previous-display');

const currentDisplayText = document.querySelector('.current-display');

const calculator = new Calculator(previousDisplayText, currentDisplayText);




// Adding Event Listeners on clicking each buttons
btnNumbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

btnOperations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText);
        calculator.updateDisplay();
    })
})


equals.addEventListener('click', button => {
        calculator.evaluate();
        calculator.updateDisplay();
    })

clear.addEventListener('click', button => {
        calculator.allClear();
        calculator.updateDisplay();
    })



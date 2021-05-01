// Constructor Class
class Calculator {
    constructor(previousDisplayText, currentDisplayText){
        this.previousDisplayText = previousDisplayText;
        this.currentDisplayText = currentDisplayText;
        this.allClear();
    }
    //Functions
allClear() {
    this.currentDisplay = '0';
    this.previousDisplay = '';
    this.operation = undefined;
}

appendNumber(number) {
    if(number === '.' && this.currentDisplay.includes('.')) return
    if(this.currentDisplay.length > 11) {
        return
    } else {
        this.currentDisplay = this.currentDisplay.toString() + number.toString();
    }
    
    
}

selectOperation(operation) {
    if(this.currentDisplay === '') return
    if(this.previousDisplay !== '') {
        this.evaluate()
    }
    this.operation = operation;
    this.previousDisplay = this.currentDisplay
    this.currentDisplay = ''
}

evaluate() {
    let evaluation 
    const first = parseFloat(this.previousDisplay);
    const second = parseFloat(this.currentDisplay)
    if(isNaN(first) || isNaN(second)) return
    switch(this.operation) {
        case '+': 
        evaluation = first + second;
        break;

        case '-': 
        evaluation = first - second;
        break;

        case '*': 
        evaluation = first * second;
        break;

        case '/': 
        evaluation = first / second;
        break;

        default:
            break;
    }
    if(evaluation.toString().length > 10) {
        this.currentDisplay = evaluation.toPrecision(9);
    } else {
        this.currentDisplay = evaluation;
    }
    this.operation = undefined;
    this.previousDisplay = ''
}

getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if(isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }

    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    }else {
        return integerDisplay;
    }
}

updateDisplay() { 
    this.currentDisplayText.innerText = this.getDisplayNumber(this.currentDisplay);
    if(this.operation != null) {
        this.previousDisplayText.innerText = `${this.getDisplayNumber(this.previousDisplay)} ${this.operation}`;
    
    } else {
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




// Adding Event Listeners
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
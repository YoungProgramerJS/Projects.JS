class Calculator {
    constructor(upperElement, lowerElement) {
        this.upperElement = upperElement
        this.lowerElement = lowerElement
        this.clear()
    }


    clear() {
        this.lower = ''
        this.upper = ''
        this.operation = undefined
    }

    delete() {
        this.lower = this.lower.toString().slice(0, -1)

    }

    appendNumber(number) {
        if(number === '.' && this.lower.includes('.')) return
        this.lower = this.lower.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.lower === '') return
        if(this.upper !== '') {
            this.compute()
        }
        this.operation = operation
        this.upper = this.lower
        this.lower = ''
    }

    compute() {
        let resoult
        const up = parseFloat(this.upper)
        const low = parseFloat(this.lower)
        if(isNaN(up) || isNaN(low)) return
        switch(this.operation){
            case '+' :
                resoult = up + low
                break
            case '-' :
                resoult = up - low
                break
            case '%' :
                resoult = up / low
                break
            case '*' :
                resoult = up * low
                break
            default:
                return
        }
        this.lower = resoult
        this.operation = undefined
        this.upper = ''
    }


    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('pl', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay
        }
    }

    updateDisplay() {
        this.lowerElement.innerText = this.getDisplayNumber(this.lower)
        if(this.operation != null) {
            this.upperElement.innerText = `${this.getDisplayNumber(this.upper)} ${this.operation}`
        } else {
            this.upperElement.innerText = ''
        }
        
    }

    
}








const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-c]')
const upperElement = document.querySelector('[data-upper]')
const lowerElement = document.querySelector('[data-lower]')

const calculator = new Calculator(upperElement, lowerElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button => {
    calculator.delete()
    calculator.updateDisplay()
})
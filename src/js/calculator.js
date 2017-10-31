export default class Calculator {

    constructor() {
        // literals for math ops with functions for calculation in order of priority
        this.ops = [{'**': (a, b) => Math.pow(a, b)},
                    {'*': (a, b) => a * b, '/': (a, b) => a / b},
                    {'+': (a, b) => a + b, '-': (a, b) => a - b}];
    }

    calculate(expression) {
        if (!expression || 0 === expression.length) {
            return '0';
        }
        let operandsAndOperators = this.split(expression);
        if (this.validateItemsValue(operandsAndOperators) &&
            this.validateItemsOrder(operandsAndOperators)) {
            return this.handle(operandsAndOperators);
        } else {
            console.log('Incorrect input');
            return 'Incorrect input'
        }
    }

    split(expression) {
        return expression.split(" ")
            .filter(item => item !== '')
            .map(item => {
                if (/^(\d+)$/.test(item)) {
                    return parseInt(item);
                } else {
                    return item;
                }
            });
    }

    validateItemsValue(input) {
        for (let i = 0; i < input.length; i++)
            if ( ! /^(\d+|\*\*|[+\-*/])$/.test(input[i]) ) return false;
        return true;
    }

    validateItemsOrder(input) {
        const size = input.length;
        const operand = /^(\d+)$/;
        if (size < 3 || (! operand.test(input[0]) || ! operand.test(input[size - 1]))) return false;
        for (let i = 1; i < size; i += 2) {
            if (! operand.test(input[i - 1]) || operand.test(input[i])) return false;
        }
        return true;
    }

    handle(operandsAndOperators) {
        let newCalculation = [], currentOperation;
        for (let i = 0; i < this.ops.length; i++) {
            for (let j = 0; j < operandsAndOperators.length; j++) {
                let currentOperandOrOperator = operandsAndOperators[j];
                let operation = this.ops[i][currentOperandOrOperator];
                if (operation) {
                    currentOperation = operation;
                }
                else if (currentOperation) {
                    let size = newCalculation.length - 1;
                    newCalculation[size] = currentOperation(newCalculation[size], currentOperandOrOperator);
                    currentOperation = null;
                } else {
                    newCalculation.push(currentOperandOrOperator);
                }
                console.log(newCalculation); // trace log, we can see how calculation happens really
            }
            operandsAndOperators = newCalculation;
            newCalculation = [];
        }
        return this.finalize(operandsAndOperators);
    }

    finalize(operandsAndOperators) {
        if (operandsAndOperators.length > 1) {
            console.log('Unexpected error: multiple results');
            return operandsAndOperators;
        } else {
            return operandsAndOperators[0];
        }
    }

}

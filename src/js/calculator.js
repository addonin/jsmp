export default class Calculator {

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

    calculate(expression) {
        if (!expression || 0 === expression.length) {
            return '0';
        }
        let operandsAndOperators = this.split(expression);

        if (this.validateItemsValue(operandsAndOperators) &&
            this.validateItemsOrder(operandsAndOperators)) {

            let ops = [{'**': (a, b) => Math.pow(a, b)},
                       {'*': (a, b) => a * b, '/': (a, b) => a / b},
                       {'+': (a, b) => a + b, '-': (a, b) => a - b}],
                newCalc = [],
                currentOp;
            for (let i = 0; i < ops.length; i++) {
                for (let j = 0; j < operandsAndOperators.length; j++) {
                    if (ops[i][operandsAndOperators[j]]) {
                        currentOp = ops[i][operandsAndOperators[j]];
                    } else if (currentOp) {
                        newCalc[newCalc.length - 1] =
                            currentOp(newCalc[newCalc.length - 1], operandsAndOperators[j]);
                        currentOp = null;
                    } else {
                        newCalc.push(operandsAndOperators[j]);
                    }
                    console.log(newCalc);
                }
                operandsAndOperators = newCalc;
                newCalc = [];
            }
            if (operandsAndOperators.length > 1) {
                console.log('Unexpected error: multiple results');
                return operandsAndOperators;
            } else {
                return operandsAndOperators[0];
            }

        } else {
            return 'Incorrect input'
        }
    }

}

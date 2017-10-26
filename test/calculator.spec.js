import Calculator from '../src/js/calculator';

describe('Calculator test', function() {

    let calc = new Calculator();

    it('Should split expression with space delimiter and trim extra spaces', function () {
        expect(calc.split(" 1  + 2  -  3"))
            .toEqual([1,'+',2,'-',3]);
    });

    it('Should fail validation for insane input values', function () {
        expect(calc.validateItemsValue(['2', '+', 'bla']))
            .toBe(false);
    });

    it('Should bless validation for correct input values', function () {
        expect(calc.validateItemsValue(['1','+','22','-','333','*','4444','/','5555','**','666666']))
            .toBe(true);
    });

    it('Should fail validation if we do not have at least two operands and operator', function () {
        expect(calc.validateItemsOrder(['1','+']))
            .toBe(false);
    });

    it('Should fail validation when first or last items are not operands', function () {
        expect(calc.validateItemsOrder(['+','1','+']))
            .toBe(false);
    });

    it('Should fail validation if there are two operands in a row', function () {
        expect(calc.validateItemsOrder(['1','+','10','1','1']))
            .toBe(false);
    });

    it('Should fail validation if there are two operators in a row', function () {
        expect(calc.validateItemsOrder(['1','+','-','1']))
            .toBe(false);
    });

    it('Should bless validation for correct order of operands/operators', function () {
        expect(calc.validateItemsOrder(['1','+','10','-','1']))
            .toBe(true);
    });

    it('Should add two numbers', function() {
        expect(calc.calculate('100 + 11 - 6 ** 2 / 3 * 2'))
            .toBe(87);
    });

});

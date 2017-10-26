import Calculator from '../src/js/calculator';

describe('Calculator test', function() {

    it('Should add two numbers', function() {
        let calc = new Calculator();
        expect(calc.calculate('2 + 2')).toBe('4');
    });
});

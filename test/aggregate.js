import JSLinq from '../index';
import {expect} from 'chai';

describe('aggregate test', () => {
    it('array sum', () => {
        let result = new JSLinq([1, 2, 3]).aggregate(0, (x, i) => x + i);

        expect(result).to.equal(6);
    });

    it('array doubled sum', () => {
        let result = new JSLinq([1, 2, 3]).aggregate(0, (x, i) => x + i, i => i * 2);

        expect(result).to.equal(12);
    });

    it('string concat', () => {
        let result = new JSLinq(["1", "2", "3"]).aggregate("", (x, i) => x + i);

        expect(result).to.equal("123");
    });

    it('generator sum', () => {
        let result = new JSLinq(function *(){
            yield 1;
            yield 2;
            yield 3;
        }).aggregate(0, (x, i) => x + i);

        expect(result).to.equal(6);
    });
});

import JSLinq from '../index';
import {expect} from 'chai';

describe('concat test', () => {
    it('array and array', () => {
        let result = new JSLinq([1, 2, 3]).concat([4, 5]).concat([6]).toArray();

        expect(result).to.eql([1, 2, 3, 4, 5, 6]);
    });

    it('array and generator', () => {
        let result = new JSLinq([1, 2, 3]).concat(function *(){
            yield 4;
            yield 5;
        }).concat([6]).toArray();

        expect(result).to.eql([1, 2, 3, 4, 5, 6]);
    });
});

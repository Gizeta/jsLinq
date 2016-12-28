import JSLinq from '../index';
import {expect} from 'chai';

describe('toArray test', () => {
    it('array', () => {
        let result = new JSLinq([1, 2, 3]).toArray();

        expect(result).to.eql([1, 2, 3]);
    });

    it('generator', () => {
        let result = new JSLinq(function *(){
            yield 1;
            yield 2;
            yield 3;
        }).toArray();

        expect(result).to.eql([1, 2, 3]);
    });

    it('string', () => {
        let result = new JSLinq('123').toArray();

        expect(result).to.eql(['1', '2', '3']);
    });
});

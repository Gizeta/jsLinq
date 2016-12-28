import JSLinq from '../index';
import {expect} from 'chai';

describe('sum test', () => {
    it('array', () => {
        let result = new JSLinq([1, 2, 3]).sum();

        expect(result).to.equal(6);
    });
    
    it('generator', () => {
        let result = new JSLinq(function *(){
            yield 1;
            yield 2;
            yield 3;
        }).sum();

        expect(result).to.equal(6);
    });
});

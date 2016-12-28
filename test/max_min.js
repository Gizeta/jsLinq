import JSLinq from '../index';
import {expect} from 'chai';

describe('max & min test', () => {
    it('max', () => {
        let result = new JSLinq([1, 2, 3]).max();

        expect(result).to.equal(3);
    });
    
    it('min', () => {
        let result = new JSLinq(function *(){
            yield 1;
            yield 2;
            yield 3;
        }).min();

        expect(result).to.equal(1);
    });
});

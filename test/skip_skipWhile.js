import JSLinq from '../index';
import {expect} from 'chai';

describe('skip & skipWhile test', () => {
    it('skip', () => {
        let result = new JSLinq([1, 2, 3]).skip(2).toArray();

        expect(result).to.eql([3]);
    });
    
    it('skipWhile', () => {
        let result = new JSLinq([1, 2, 3, 4, 5]).skipWhile(i => i < 3).toArray();

        expect(result).to.eql([3, 4, 5]);
    });
});

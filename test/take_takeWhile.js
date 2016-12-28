import JSLinq from '../index';
import {expect} from 'chai';

describe('take & takeWhile test', () => {
    it('take', () => {
        let result = new JSLinq([1, 2, 3]).take(2).toArray();

        expect(result).to.eql([1, 2]);
    });
    
    it('takeWhile', () => {
        let result = new JSLinq([1, 2, 3, 4, 5]).takeWhile(i => i < 3).toArray();

        expect(result).to.eql([1, 2]);
    });
});

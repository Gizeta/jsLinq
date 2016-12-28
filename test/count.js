import JSLinq from '../index';
import {expect} from 'chai';

describe('count test', () => {
    it('array', () => {
        let result = new JSLinq([1, 2, 3]).count();

        expect(result).to.equal(3);
    });
    
    it('generator', () => {
        let result = new JSLinq(function *(){
            yield 1;
            yield 2;
            yield 3;
        }).count();

        expect(result).to.equal(3);
    });
});

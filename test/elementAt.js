import JSLinq from '../index';
import {expect} from 'chai';

describe('elementAt test', () => {
    it('generator', () => {
        let result = new JSLinq(function *(){
            yield 1;
            yield 2;
            yield 3;
        }).elementAt(1);

        expect(result).to.equal(2);
    });
});

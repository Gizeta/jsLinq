import JSLinq from '../index';
import {expect} from 'chai';

describe('contains test', () => {
    it('truth', () => {
        let result = new JSLinq([1, 2, 3]).contains(2);

        expect(result).to.be.true;
    });

    it('lie', () => {
        let result = new JSLinq([1, 2, 3]).contains(4);

        expect(result).to.be.false;
    });

    it('another truth', () => {
        let result = new JSLinq(function *(){
            yield 1;
            yield 2;
            yield 3;
        }).contains(4, (a, i) => a === i + 1);

        expect(result).to.be.true;
    });
});

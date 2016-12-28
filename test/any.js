import JSLinq from '../index';
import {expect} from 'chai';

describe('any test', () => {
    it('truth', () => {
        let result = new JSLinq([1, 2, 3]).any(i => i < 2);

        expect(result).to.be.true;
    });

    it('lie', () => {
        let result = new JSLinq([1, 2, 3]).any(i => i > 4);

        expect(result).to.be.false;
    });

    it('another truth', () => {
        let result = new JSLinq(function *(){
            yield 1;
            yield 2;
            yield 3;
        }).any();

        expect(result).to.be.true;
    });
});

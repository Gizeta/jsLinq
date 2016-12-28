import JSLinq from '../index';
import {expect} from 'chai';

describe('all test', () => {
    it('truth', () => {
        let result = new JSLinq([1, 2, 3]).all(i => i < 4);

        expect(result).to.be.true;
    });

    it('lie', () => {
        let result = new JSLinq([1, 2, 3]).all(i => i > 4);

        expect(result).to.be.false;
    });

    it('another lie', () => {
        let result = new JSLinq(function *(){
            yield 1;
            yield 2;
            yield 3;
        }).all(i => i < 2);

        expect(result).to.be.false;
    });
});

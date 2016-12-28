import JSLinq from '../index';
import {expect} from 'chai';

describe('where test', () => {
    it('filter', () => {
        let result = new JSLinq([1, 2, 3]).where(i => i > 1).toArray();

        expect(result).to.eql([2, 3]);
    });

    it('sum', () => {
        let result = new JSLinq([1, 2, 3]).where(i => i % 2 == 1).sum();

        expect(result).to.equal(4);
    });

    it('concat', () => {
        let result = new JSLinq([1, 2, 3]).where(i => i % 2 == 1).concat([2]).toArray();

        expect(result).to.eql([1, 3, 2]);
    });
});

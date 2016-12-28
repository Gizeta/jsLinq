import JSLinq from '../index';
import {expect} from 'chai';

describe('intersect test', () => {
    it('array', () => {
        let result = new JSLinq([1, 2, 3]).intersect([2, 3]).toArray();

        expect(result).to.eql([2, 3]);
    });

    it('string', () => {
        let result = new JSLinq('abcdefg').intersect('gfed').toArray().join('');

        expect(result).to.equal('defg');
    });
});

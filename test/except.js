import JSLinq from '../index';
import {expect} from 'chai';

describe('except test', () => {
    it('array', () => {
        let result = new JSLinq([1, 2, 3]).except([2]).toArray();

        expect(result).to.eql([1, 3]);
    });

    it('string', () => {
        let result = new JSLinq('abcdefg').except('gfed').toArray();

        expect(result).to.eql(['a', 'b', 'c']);
    });
});

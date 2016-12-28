import JSLinq from '../index';
import {expect} from 'chai';

describe('first test', () => {
    it('array', () => {
        let result = new JSLinq([1, 2, 3]).first(i => i > 1);

        expect(result).to.equal(2);
    });

    it('string', () => {
        let result = new JSLinq('abcdefg').first();

        expect(result).to.equal('a');
    });
});

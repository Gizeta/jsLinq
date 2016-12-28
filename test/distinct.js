import JSLinq from '../index';
import {expect} from 'chai';

describe('distinct test', () => {
    it('array', () => {
        let result = new JSLinq([1, 2, 3, 2, 1]).distinct().toArray();

        expect(result).to.eql([1, 2, 3]);
    });

    it('string', () => {
        let result = new JSLinq('abcba').distinct().toArray();

        expect(result).to.eql(['a', 'b', 'c']);
    });
});

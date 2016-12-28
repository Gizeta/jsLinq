import JSLinq from '../index';
import {expect} from 'chai';

describe('defaultIfEmpty test', () => {
    it('empty', () => {
        let result = new JSLinq([]).defaultIfEmpty([1]).toArray();

        expect(result).to.eql([1]);
    });
    
    it('not empty', () => {
        let result = new JSLinq([2]).defaultIfEmpty([1]).toArray();

        expect(result).to.eql([2]);
    });
});

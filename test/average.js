import JSLinq from '../index';
import {expect} from 'chai';

describe('average test', () => {
    it('uint8 array', () => {
        let result = new JSLinq(new Uint8Array([1, 2, 3])).average();

        expect(result).to.equal(2);
    });
});

import Enumerable from './lib/enumerable';

export default function jsLinq(items) {
    return new Enumerable(items);
}

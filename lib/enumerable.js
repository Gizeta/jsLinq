const items = Symbol('items');
const genIter = Symbol('genIter');

const trueFunc = () => true;
const falseFunc = () => false;
const compareFunc = (a, b) => a === b;
const selfFunc = (i) => i;

export default class Enumerable {
    constructor(dataItems) {
        this[items] = dataItems;
    }

    [genIter]() {
        let dataItems = this[items];

        // create new Generator instance to clone iterator
        if (typeof dataItems === "function")
            return dataItems()[Symbol.iterator]();
        else
            return dataItems[Symbol.iterator]();
    }

    aggregate(seed, func, resultSelector = selfFunc) {
        let value = seed;
        for (let item of this[genIter]()) {
            value = func(value, resultSelector(item));
        }
        return value;
    }

    all(predicate) {
        for (let item of this[genIter]()) {
            if (!predicate(item)) return false;
        }
        return true;
    }

    any(predicate = trueFunc) {
        for (let item of this[genIter]()) {
            if (predicate(item)) return true;
        }
        return false;
    }

    average(selector = selfFunc) {
        let sum = 0, count = 0;
        for (let item of this[genIter]()) {
            sum += selector(item);
            count++;
        }
        return count == 0 ? 0 : sum / count;
    }

    concat(second) {
        return new Enumerable((function* (){
            for (let item of this[genIter]()) {
                yield item;
            }
            for (let item2 of second) {
                yield item2;
            }
        }).bind(this));
    }

    contains(value, comparer = compareFunc) {
        for (let item of this[genIter]()) {
            if (comparer(value, item))
                return true;
        }
        return false;
    }

    count(predicate = trueFunc) {
        let count = 0;
        for (let item of this[genIter]()) {
            if (predicate(item))
                count++;
        }
        return count;
    }

    defaultIfEmpty(defaultValue) {
        if (defaultValue !== undefined && this[genIter]().next().done) {
            return new Enumerable(defaultValue);
        }
        return this;
    }

    distinct(comparer = compareFunc) {
        return new Enumerable((function* (){
            let arr = [];
            for (let item of this[genIter]()) {
                let flag = false;
                for (let i of arr) {
                    if (comparer(i, item)) {
                        flag = true;
                        break;
                    }
                }
                if (flag) continue;
                arr.push(item);
                yield item;
            }
        }).bind(this));
    }

    elementAt(index) {
        let count = 0;
        for (let item of this[genIter]()) {
            if (count === index) {
                return item;
            }
            count++;
        }
        return null;
    }

    empty() {
        return new Enumerable([]);
    }

    except(second, comparer = compareFunc) {
        return new Enumerable((function* (){
            for (let item of this[genIter]()) {
                let flag = false;
                for (let i of second) {
                    if (comparer(i, item)) {
                        flag = true;
                        break;
                    }
                }
                if (flag) continue;
                yield item;
            }
        }).bind(this));
    }

    first(predicate = trueFunc) {
        for (let item of this[genIter]()) {
            if (predicate(item))
                return item;
        }
        return null;
    }

    sum(selector = selfFunc) {
        let sum = 0;
        for (let item of this[genIter]()) {
            sum += selector(item);
        }
        return sum;
    }

    toArray() {
        let arr = [];
        for (let item of this[genIter]()) {
            arr.push(item);
        }
        return arr;
    }

    where(predicate) {
        return new Enumerable((function* (){
            for (let item of this[genIter]()) {
                if (predicate(item)) yield item;
            }
        }).bind(this));
    }
}
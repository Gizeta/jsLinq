const items = Symbol('items');
const genIter  = Symbol('genIter');

export default class Enumerable {
    constructor(dataItems) {
        this[items] = dataItems;
    }

    [genIter]() {
        let dataItems = this[items];

        // create new Generator instance to clone iterator
        if (typeof dataItems === "function"){
            return dataItems()[Symbol.iterator]();}
        else
            return dataItems[Symbol.iterator]();
    }

    aggregate(seed, func, resultSelector) {
        let value = seed;
        for (let item of this[genIter]()) {
            value = func(value, resultSelector === undefined ? item : resultSelector(item));
        }
        return value;
    }

    all(predicate) {
        for (let item of this[genIter]()) {
            if (!predicate(item)) return false;
        }
        return true;
    }

    any(predicate) {
        if (predicate === undefined) return true;

        for (let item of this[genIter]()) {
            if (predicate(item)) return true;
        }
        return false;
    }

    average(selector) {
        let sum = 0, count = 0;
        for (let item of this[genIter]()) {
            sum += selector === undefined ? item : selector(item);
            count++;
        }
        return count == 0 ? 0 : sum / count;
    }

    count(predicate) {
        let count = 0;
        for (let item of this[genIter]()) {
            if (predicate === undefined) {
                count++;
                continue;
            }
            if (predicate(item)) count++;
        }
        return count;
    }

    defaultIfEmpty(defaultValue) {
        if (defaultValue !== undefined && this[genIter]().next().done) {
            return new Enumerable(defaultValue);
        }
        return this;
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

    sum(selector) {
        let sum = 0;
        for (let item of this[genIter]()) {
            sum += selector === undefined ? item : selector(item);
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
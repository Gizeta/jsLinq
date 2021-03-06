const items = Symbol('items');
const genIter = Symbol('genIter');

const trueFunc = () => true;
const falseFunc = () => false;
const compareFunc = (a, b) => a === b;
const selfFunc = (i) => i;

export default class Enumerable {
    constructor(dataItems) {
        this[items] = dataItems;
        this[Symbol.iterator] = this[genIter];
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
        for (let item of this) {
            value = func(value, resultSelector(item));
        }
        return value;
    }

    all(predicate) {
        for (let item of this) {
            if (!predicate(item)) return false;
        }
        return true;
    }

    any(predicate = trueFunc) {
        for (let item of this) {
            if (predicate(item)) return true;
        }
        return false;
    }

    average(selector = selfFunc) {
        let sum = 0, count = 0;
        for (let item of this) {
            sum += selector(item);
            count++;
        }
        return count == 0 ? 0 : sum / count;
    }

    concat(second) {
        let sec = second instanceof Enumerable ? second : new Enumerable(second);
        return new Enumerable((function* (){
            for (let item of this) {
                yield item;
            }
            for (let item2 of sec) {
                yield item2;
            }
        }).bind(this));
    }

    contains(value, comparer = compareFunc) {
        for (let item of this) {
            if (comparer(value, item))
                return true;
        }
        return false;
    }

    count(predicate = trueFunc) {
        let count = 0;
        for (let item of this) {
            if (predicate(item))
                count++;
        }
        return count;
    }

    defaultIfEmpty(defaultValue) {
        if (defaultValue !== undefined && this[genIter]().next().done) {
            return defaultValue instanceof Enumerable ? defaultValue : new Enumerable(defaultValue);
        }
        return this;
    }

    distinct(comparer = compareFunc) {
        return new Enumerable((function* (){
            let arr = [];
            for (let item of this) {
                let hit = false;
                for (let i of arr) {
                    if (comparer(i, item)) {
                        hit = true;
                        break;
                    }
                }
                if (hit) continue;
                arr.push(item);
                yield item;
            }
        }).bind(this));
    }

    elementAt(index) {
        let count = 0;
        for (let item of this) {
            if (count === index) {
                return item;
            }
            count++;
        }
        return null;
    }

    except(second, comparer = compareFunc) {
        let sec = second instanceof Enumerable ? second : new Enumerable(second);
        return new Enumerable((function* (){
            for (let item of this) {
                let hit = false;
                for (let i of sec) {
                    if (comparer(i, item)) {
                        hit = true;
                        break;
                    }
                }
                if (hit) continue;
                yield item;
            }
        }).bind(this));
    }

    first(predicate = trueFunc) {
        for (let item of this) {
            if (predicate(item))
                return item;
        }
        return null;
    }

    intersect(second, comparer = compareFunc) {
        let sec = second instanceof Enumerable ? second : new Enumerable(second);
        return new Enumerable((function* (){
            for (let item of this) {
                for (let i of sec) {
                    if (comparer(i, item)) {
                        yield item;
                    }
                }
            }
        }).bind(this));
    }

    max(selector = selfFunc) {
        let max = Number.MIN_VALUE;
        for (let item of this) {
            let val = selector(item);
            if (val > max) {
                max = val;
            }
        }
        return max;
    }

    min(selector = selfFunc) {
        let min = Number.MAX_VALUE;
        for (let item of this) {
            let val = selector(item);
            if (val < min) {
                min = val;
            }
        }
        return min;
    }

    skip(count) {
        return new Enumerable((function* (){
            let i = 0;
            for (let item of this) {
                if (i++ < count) continue;
                yield item;
            }
        }).bind(this));
    }

    skipWhile(predicate) {
        return new Enumerable((function* (){
            let i = 0;
            for (let item of this) {
                let skip = true;
                if (skip && predicate(item, i++)) continue;
                else if (skip) skip = false;
                yield item;
            }
        }).bind(this));
    }

    sum(selector = selfFunc) {
        let sum = 0;
        for (let item of this) {
            sum += selector(item);
        }
        return sum;
    }

    take(count) {
        return new Enumerable((function* (){
            let i = 0;
            for (let item of this) {
                if (i++ < count) yield item;
                else return;
            }
        }).bind(this));
    }

    takeWhile(predicate) {
        return new Enumerable((function* (){
            let i = 0;
            for (let item of this) {
                if (predicate(item, i++)) yield item;
                else return;
            }
        }).bind(this));
    }

    toArray() {
        let arr = [];
        for (let item of this) {
            arr.push(item);
        }
        return arr;
    }

    where(predicate) {
        return new Enumerable((function* (){
            for (let item of this) {
                if (predicate(item)) yield item;
            }
        }).bind(this));
    }
}

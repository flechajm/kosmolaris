class Combination {
    constructor({
        element1,
        element2,
        result,
        isSpecial,
        ignoreForCount,
    }) {
        this.element1 = element1;
        this.element2 = element2;
        this.result = result;
        this.isSpecial = isSpecial ?? false;
        this.ignoreForCount = ignoreForCount ?? false;
    }
}

export default Combination;
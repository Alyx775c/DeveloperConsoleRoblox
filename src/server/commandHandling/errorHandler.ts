export class Result<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    /**
     * unwrap
     */
    public unwrap() {
        return this.value;
    }
}
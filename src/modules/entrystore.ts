export default class ExpressionStore {
    #size: number;
    #store: string[];
    #pointer: number;

    constructor(size: number) {
        this.#size = size;
        this.#store = [];
        this.#pointer = 0;
    }

    addEntry(entry: string) {
        if (this.#store.length === this.#size) {
            this.#store.shift();
        }
        
        this.#store.push(entry);
        this.#pointer = this.#store.length-1;   
    }

    moveUp(): void {
        if (this.#pointer < this.#store.length-1) {
            this.#pointer++;
        }
    }
    moveDown(): void {
        if (this.#pointer > 0) {
            this.#pointer--;
        }
    }

    getExpression(): string {
        return this.#store[this.#pointer];
    }

    getLast():string {
        return this.#store[this.#store.length-1];
    }

    get size():number {
        return this.#size;
    }
    get list(): string[] {
        return this.#store;
    }

}
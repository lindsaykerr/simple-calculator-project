/**
 * @template T - any generic type
 */
 interface IStack<T> {
    push: (item:T)=>void;
    pop: ()=>T | undefined;
    size: number;
    peek: ()=>T | undefined;
    isEmpty: boolean;
}

/**
 * Implements the Stack Data Structure
 * 
 * @template Type - is any generic type
 */
export class Stack<Type> implements IStack<Type> {
    #size: number;
    #theStack: Array<Type>;
    
    constructor() {
        this.#size = 0;
        this.#theStack = []; 
    }

    /**
     * Pushes an item onto the stack
     * @param {Type} item Item to be added
     */    
    push(item: Type) {
        this.#size++;
        this.#theStack.push(item);
    }

    /**
     * Item to be removed from stack
     * @returns returns item or undefined
     */
    pop() {
        if (this.#size > 0) {
            this.#size--;
        }
        return this.#theStack.pop();
    }
    
    /**
     * Get the value of the item at the top of the stack
     * @returns item or undefined 
     */
    peek() {
        if (this.#size > 0) {
            return this.#theStack[this.#theStack.length-1]
        }
    }
 
    /**
     * Get the size of the stack
     */
    get size() {
        return this.#size;
    }

    /**
     * Check if the stack is empty
     */
    get isEmpty() {
        return this.#size === 0; 
    }
}
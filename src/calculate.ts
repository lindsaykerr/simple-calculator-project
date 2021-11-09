import { Stack } from "./modules/stack";

interface ErrorException {
    message: string;
    name: string;
}

class OperandError implements ErrorException{
    
    message;
    name;
    
    constructor(message: string) {
        this.message = message;
        this.name = "Operand Error";
    }
}

class SyntaxError implements ErrorException {
    message;
    name;
    constructor(message: string) {
        this.message = message;
        this.name = "Syntax Error"
    }
}


export default class Calculation {

    static do(input:string, sf=15): string {
        if (!input) return "";
        const parts = input.split("");
        try {
            if(this.isBalanced(parts)) {

                const result = this.calculation(
                    this.toPostfix(
                        this.reformatInfixExp(
                            this.reduceSigns(parts)
                        )
                    )
                )
                if (result.toString().length > sf) {
                    return result.toExponential(8);
                }
                else return result.toString();
                
            }
            else {
                throw new SyntaxError("Syntax Error");
            }
        } catch(e: any) {
            return e.message;
        }
    }


    private static isBalanced(input: string[]): boolean {
        const braceStack = new Stack<string>();
        for (let i in input) {
            let symbol = input[i];
            if (symbol === "(") {
                braceStack.push(symbol);
            }
            else if (symbol === ")") {
                if(!braceStack.isEmpty) {
                    braceStack.pop();
                    continue;
                }
                return false;
            }
        }
        if (!braceStack.isEmpty) {
            return false;
        }
        return true;
    }

    private static reduceSigns(input: string[]): string[] {
    
        let i = 0;
        while(i < input.length) {
            if (input[i-1]) {
                let reduceSign = undefined;
                switch(input[i-1] + input[i]) {
                    case "--":
                    case "++":
                        reduceSign = "+";
                    break;
                    case "+-":
                    case "-+":
                        reduceSign = "-";
                    break;
                    case "..":
                        reduceSign = ".";
                    break;
                }
                if(reduceSign) {
                    input[i-1] = reduceSign;
                    input.splice(i,1);
                    i--;
                }
    
            }
            i++;
        }
  
        return input;
    }
    /**
     * Modifies the user submitted infix expression and reformats it into a standard from which
     * aids post proccessing. 
     * 
     * @param input a math expression of type string[]. 
     * @returns an array containing operands and operators.
     */
    private static reformatInfixExp(input: string[]):any[] {
        
        const output: string[] = [];

        const isNumber = (x: string) => !isNaN(Number(x));
    
        for(let i = 0; i < input.length; i++) {
            
            let current = input[i];
            const next = input[i+1];
            const last = output[output.length-1];
            
            if(isNumber(current) && isNumber(last)) {
                    output[output.length-1] = `${last}${current}`;
                    continue;
            }
            else if (current ==="-"){
                if(isNumber(next) && !(last === "^2" || last === ")" ) && !isNumber(last)) {
                    input[i+1] = '-' + next;
                    continue;
                }
                else if(next === "." && !isNumber(last)) {
                    input[i+1] = '-0' + next;
                    continue;
                }
                else if((next === "\u221A" || next === "(") && !(last === "^2" || last === ")" ) && !isNumber(last)) {
                    output.push("-1");
                    output.push("x");
                    continue;

                }
            }
            else if (current === ".") {
                if (isNumber(next)) {
                    let j = i+1;
                    let decimal = isNumber(last) ? '.' : '0.';
                    // build up decimal values
                    while(isNumber(input[j])) {
                        decimal += input[j];
                        j++;
                    }
                    // overwrite the last number with decimal value
                    input[j-1] = decimal; 
                    i = j-2; 
                    continue;
                }
                current = '0.0';
            }
            else if (current === "(") {
                if (isNumber(last) || last ===")") {
                    output.push('x');
                }
            }else if (current === "\u221A"){
                if (next) {           
                    if(isNumber(last)) {
                        output.push('x');
                    }
                }
                else current = '!'; // cause an error
            }
            else if (current === "^") {
                output.push("^2");
                i+=1;
                continue;
            }
            else if (current === "+"){
                if(!(last ==="^2" || last  === ")") && !isNumber(last)) {
                    continue;
                }
            }
            
            output.push(current);
            
        }
        return output.map((x)=> isNumber(x)? Number(x) : x);
    };


    /**
     * Converts a correctly formated expression into postfix notation.
     * @param infixList 
     * @returns postfix array[]
     */
    private static toPostfix(infixList: any[]): string[] {
        
        interface op {
            [key: string]: number;
        } 
        
        const opStack = new Stack<string>(); // operation stack
        
        // operation priority lookup
        const opLookup:op = { 
            '(' : -1,
            '\u221A' : 4,
            '^2' : 4,
            'x' : 3, // multiplication for terms such as x(b)  
            '*' : 2,
            '/' : 2,
            '+' : 1,
            '-' : 1,
            ' ' : 0,
        };
            
        let postfix:any[] = []; // the ouput source
    
        /*
         * loop through each math component
         */
        for(let i = 0; i < infixList.length; i++) {
    
            let asymbol;      
            if ( typeof infixList[i] === 'string') {
                asymbol = infixList[i].trim() || '';
            }
            else {
                asymbol = infixList[i];
            }

            // numbers get pushed automatically to postfix array
            if (typeof asymbol === 'number') {
                postfix.push(asymbol);
            }
            // open parenthesis get pushed automaticall to the operation stack
            else if(asymbol === "(") {
                opStack.push(asymbol);
            }
            // when a closed parenthesis is encounterd 
            else if(asymbol === ")") {
                // pop all the operators from the operation stack 
                // to the postfix array
                while(!opStack.isEmpty && opStack.peek() !== '(') {   
                    postfix.push(opStack.pop()!);
                }
                // get rid of the opening brace still on the operation stack
                if (opStack.peek() === "(") {
                    opStack.pop()!; 
                } 
                else if(opStack.peek()) {
                    postfix.push(opStack.pop()!);
                }
            }
            else {
                // for any other operator, check if there are operations on the 
                // operation stack. If there are, compare their operation order level with the 
                // current operation. If the current operation is lesser or equal to stack operation
                // remove the stack operation and place it on the postfix array as it has a 
                // higher level of priority.
                while (!opStack.isEmpty && opLookup[asymbol] <= opLookup[opStack.peek()!] ) {
                    postfix.push(opStack.pop()!);
                }
                // push the operation to operation stack
                opStack.push(asymbol);
            }
        }
        // Once all symbols have been processes, push any remaining operators from the operation stack
        // to the postfix array
        while(!opStack.isEmpty) {
            postfix.push(opStack.pop()!);
        }
        //console.log(postfix);
        return postfix;
    }

    private static calculation(postFixExp: any[]): number {
        /**
         * Performs simple mathematical calculations
         * 
         * @param operator the mathematical operator 
         * @param operand1 the first numerical operand
         * @param operand2 the secound numerical operand 
         * @returns number
         * @throws OperandError 
         */
        const calculate = (operator: string, operand1: number, operand2 = 0): number => {
            interface operations {
                [key: string]: () => number | undefined;
            }
            const calculations:operations = {
                '+': () => operand1 + operand2,
                '-': () => operand1 - operand2,
                '/': () => operand1 / operand2,
                '*': () => operand1 * operand2,
                'x': () => operand1 * operand2,
                '^2': () => operand1 * operand1,
                '\u221A': () => Math.sqrt(operand1)
            }
            
            const result = calculations[operator]()!;
            //console.log(result);
            if (typeof result === 'number') 
                return result;
            else
                throw new OperandError("Operator Error");
        };
        
        /**
         * Recursive function for calculating a postfix math expression
         * @param expression an array comprising of (number) operands and (string) operators in a postfix order. 
         * @returns a value
         */
        const helper = (expression: any[]): number => {
            
            
            if (expression.length <= 1) {
                if(isNaN(Number(expression[0]))) {
                    throw new OperandError("Operand Error 1");
                }
                return expression[0];
            }
          
            let opIndex = 0;    // operator index
            let calc: number;   // calculation 
            let delCount;       // items to be removed 
            
            // find the first available operator position
            while(typeof expression[opIndex] === 'number') ++opIndex;
            
            // then apply the operation to either unary or binary operands 
            if (expression[opIndex] ==='\u221A' || expression[opIndex] === '^2') {                
                if (expression[opIndex-1]) {
                    calc = calculate(expression[opIndex], expression[opIndex-1]);
                    delCount = 1; 
                    
                } 
                else throw new OperandError("Operand Error 1");          
            }
            else {
                //console.log("err", expression[opIndex], expression[opIndex-1], expression[opIndex-2]) 
                if (typeof expression[opIndex-1] === "number" && typeof expression[opIndex-2] === 'number') {  
                     
                    calc = calculate(expression[opIndex], expression[opIndex-2], expression[opIndex-1]);
                    delCount = 2;
                }
                else throw new OperandError("Operand Error 2");
            }
            // create a new array expression by replaces the operation with the result, 
            // this will reduce the size of the array every time helper is called.
            return helper([...expression.slice(0,opIndex-delCount), calc, ...expression.slice(opIndex+1)]);
    
        }
        return helper(postFixExp);
    }
}

/**
 * Process combination pairs of addition and subtraction signs 
 * @param input 
 * @returns + | - | .
 */
export const reduceSigns = (input: string[]): string[] => {
    
    let i = 0;
    while(i < input.length) {
        if (input[i-1]) {
            let reduceSignTo = undefined;
            switch(input[i-1] + input[i]) {
                case "--":
                case "++":
                    reduceSignTo = "+";
                break;
                case "+-":
                case "-+":
                    reduceSignTo = "-";
                break;
                case "..":
                    reduceSignTo = ".";
                break;
            }
            if(reduceSignTo) {
                input[i-1] = reduceSignTo;
                input.splice(i,1);
                i--;
            }
        }
        i++;
    }
    return input;
} 

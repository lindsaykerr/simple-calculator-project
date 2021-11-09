import React from 'react';
import ButtonGroup from './ButtonGroup';
import {IButton} from './interfaces';

function OperationPad() {
    const btnType = "operations";
    const numberpad: IButton[] = [
        {symbol: '(', type:btnType , id: 'open-brace'},
        {symbol: ')', type:btnType , id: 'closed-brace'},
        {symbol: String.fromCharCode(8730), type:btnType , id: 'square-root'},
        {symbol: 'x' + String.fromCharCode(178), type:btnType , id: 'power-2'},
        {symbol: 'X', type:btnType , id: 'multiply'},
        {symbol: String.fromCharCode(8725), type:btnType , id: 'divide'},
        {symbol: String.fromCharCode(43), type:btnType , id: 'addition'},
        {symbol: '\u2212', type:btnType , id: 'subtration'},
        {symbol: String.fromCharCode(61), type:btnType , id: 'equals'},        
    ] 
    return <ButtonGroup buttons={numberpad} groupName='operation-pad'/>;
}


export default OperationPad;
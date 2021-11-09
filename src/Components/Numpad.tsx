import React from 'react';
import ButtonGroup from './ButtonGroup';
import {IButton} from './interfaces';

function NumberPad() {
    const btnType = "number-pad";
    const numberpad: IButton[] = [
        {symbol: 'AC', type: 'control', id: 'clear-all'},
        {symbol: 'DE', type: 'control', id: 'delect-one'},
        {symbol: ' ', type: 'blank'},
        {symbol: '7', type:btnType , id: 'seven'},
        {symbol: '8', type:btnType , id: 'eight'},
        {symbol: '9', type:btnType , id: 'nine'},
        {symbol: '4', type:btnType , id: 'four'},
        {symbol: '5', type:btnType , id: 'five'},
        {symbol: '6', type:btnType , id: 'six'},
        {symbol: '1', type:btnType , id: 'one'},
        {symbol: '2', type:btnType , id: 'two'},
        {symbol: '3', type:btnType , id: 'three'},
        {symbol: '0', type:btnType , id: 'zero'},
        {symbol: '.', type:btnType , id: 'period'},
        {symbol: '00', type:btnType , id: 'double-zero'},
        
    ] 
    return <ButtonGroup buttons={numberpad} groupName='number-pad'/>;
}


export default NumberPad;

import React, { useCallback, useContext, useState } from 'react';
import Display from './Components/Display';
import NumberPad from './Components/Numpad';
import OperationPad from './Components/OperationPad';
import HistoryNav from './Components/HistoryNav';
import {DisplayContext, StorageContext} from './AppContext';
import Calculation from './calculate';
interface mapSymb {
  [key: string]: string;
} 
const mapSymbols: mapSymb = {
    '(': '(',
    ')': ')', 
    '\u221A': '\u221A',
    '\u00B2': '^2',
    'x': '*',
    '\u2215': '/',
    '\u002B': '+',
    '\u2212': '-',
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '.': '.',   
  }


function Calculator () {
  const [getDisplay, setDisplay] = useState('');
  const [calcAvailable, setCalcAvaible] = useState(() => false);
  const history = useContext(StorageContext);


  const updateDisplay = useCallback((abutton: string) => {

    switch(abutton) {
      case "=":
        if (getDisplay !== '') {
          history.addEntry(getDisplay);
          setCalcAvaible(true);
          setDisplay(Calculation.do(getDisplay.split("").map((x)=> mapSymbols[x]).join(''), 17));
        }
      break;
      case "DE":
          if (getDisplay) {
            setDisplay((x) => x.slice(0, getDisplay.length-1))
          }
      break;
      case "AC":
        setDisplay("");
        setCalcAvaible(false);
      break;
      case "<":
        history.moveDown();
        setDisplay(history.getExpression());
      break;
      case ">": 
        history.moveUp();
        
        setDisplay(history.getExpression());
      break;
      default:
        if (calcAvailable) {
          setCalcAvaible(false);
          if ("0123456789.".indexOf(abutton) >= 0) {
            setDisplay("");
          } 
          else if (isNaN(Number(getDisplay))){
            setDisplay("");
          }
        }
        setDisplay((x) => {
          if(abutton === 'x\u00B2') {
            return x + '\u00B2'; 
          }
          else if (abutton ==='X') {
            return x + 'x';
          }
          return x + abutton;
        });
      break;
    }  
  },[calcAvailable, getDisplay, history]); 

return (
      <DisplayContext.Provider value={updateDisplay}>
      <div id="calculator">
        <HistoryNav />
        <Display output={getDisplay}/>
        <NumberPad />
        <OperationPad />
        <div></div>
      </div>
      </DisplayContext.Provider>
    );
}

export default Calculator;

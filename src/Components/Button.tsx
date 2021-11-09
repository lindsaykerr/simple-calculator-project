import React, {useContext } from "react";
import {IButton} from './interfaces'
import {DisplayContext} from '../AppContext';


function ButtonInstance(props: IButton) {
    const updateDisplay = useContext(DisplayContext);
    return <button onClick={() => updateDisplay(props.symbol)} type="button" id={props.id}>{props.symbol}</button>;
}

function Button(props: IButton) {
    
    let button:string | object = '';
    if(props.type !== 'blank') {
        button = <ButtonInstance symbol={props.symbol} type={props.type} id={props.id}/>;
    }
    return (
        <div className={'btn-wrapper ' + props.type}>
            {button}
        </div>
    );
}
export default Button;


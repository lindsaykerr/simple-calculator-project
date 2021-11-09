import {IButtonGroup} from './interfaces';
import Button from './Button';

export default function ButtonGroup(prop: IButtonGroup) {
    let key = 1001;
    const buttons = prop.buttons.map((e)=> {        
            return <Button key={e.id || ++key} symbol={e.symbol} type={e.type} id={e.id}/>
    });
    return (<div id={prop.groupName}>{buttons}</div>);
}


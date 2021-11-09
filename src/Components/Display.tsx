import React from 'react';

function Display(props: {output: string}) { 
    return (
        <div id='display'>
            <code id="output">{props.output}</code>
        </div>
    )
}

export default Display;

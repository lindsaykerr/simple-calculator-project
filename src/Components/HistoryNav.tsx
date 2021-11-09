import React, { useContext } from "react";
import {DisplayContext} from "../AppContext"

function HistoryNav() {
    const display = useContext(DisplayContext)
    return (
        <div id="history-nav">
            <button id="back" onClick={()=> display("<")}>&lt;</button>
            <button id="forward" onClick={()=> display(">")}>&gt;</button>
            
        </div>
    )
}

export default HistoryNav;
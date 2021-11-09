import React from 'react'

export interface IDisplay {
    output: string;
} 

export interface IData {
    display: IDisplay;
}

export interface IButton {
    symbol: string;
    type: string;
    id?: string;
    class?: string;
    inputFunc? (val: string): void;
}

export interface IButtonGroup {
    groupName: string;
    buttons: IButton[];
}

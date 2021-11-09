import React from "react";
import ExpressionStore from "./modules/entrystore";

export const DisplayContext = React.createContext((x:string) => {});
export const StorageContext = React.createContext(new ExpressionStore(10));
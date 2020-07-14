import { Component } from "react";
import React from 'react';
export const StoreContext = React.createContext({value : null});

export default class MyProvider extends React.Component {
    render(){
        return(
            <StoreContext.Provider value={{store : this.props.store}}>
                {this.props.children}
            </StoreContext.Provider>
        )
    }
}


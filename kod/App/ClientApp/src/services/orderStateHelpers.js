import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { mapStateToProps } from "../store/helpers/mapStateToProps";

export const getOrderState = (n) => {
    switch(n){
        case 0: return "Принят";
        case 1: return "Подтвержден";
        case 2: return "Выполняется";
        case 3: return "Отменен";
        case 4: return "Исполнен";
        default: return "";
    }
}

class stateSelector extends React.Component {
    constructor(props){
        super(props);
    }

    render = () => {

        const {onChange, value,key} = this.props;
        if(this.selector) this.selector.selectedIndex = value;
        return (
            <select defaultValue={value} ref={(el)=> this.selector = el} onChange={({target})=>onChange(target.options[target.selectedIndex].value)}>
                <option value="0">Принят</option>
                <option value="1">Подтвержден</option>
                <option value="2">Выполняется</option>
                <option value="3">Отменен</option>
                <option value="4">Исполнен</option>
            </select>
        )
    }
}


export const StateSelector = withRouter(connect(mapStateToProps)(stateSelector));

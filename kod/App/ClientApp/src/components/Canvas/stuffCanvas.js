import React, { Component } from 'react';
import './stuffCanvas.css'

export default class StuffCanvas extends Component {

    render(){
        return (
            <div className="canvas center flex-wrap">
                {this.props.children}
            </div>
        )
    }
}
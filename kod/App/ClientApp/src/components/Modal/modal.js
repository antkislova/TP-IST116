import React from 'react';
import './modal.css';

export default class Modal extends React.Component {
    
    handleClose = (e) => {
        if(e.target.className.includes("blackout")){
            this.props.onClose();
        }
    }

    render = () => {
        const { children } = this.props;

        return (<div className="blackout center" onClick={this.handleClose}>
            <div className="modal-window">
                {children}
            </div>
        </div>)
    }
}



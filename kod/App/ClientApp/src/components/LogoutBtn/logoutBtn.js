import React from "react";
import {connect} from "react-redux"
import { logout } from "../../store/actions/authActions"

const LogoutBtn = ({ dispatch }) => {
    return (
        <div className="rt-box center">
                <div onClick={()=>dispatch(logout())} className="out-btn">
                    Выйти
                </div>
        </div>
    )
}

export default connect()(LogoutBtn);
import React from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { Link, withRouter } from "react-router-dom";
import "./userCard.css";
import { mapStateToProps } from "../../store/helpers/mapStateToProps"

const UserCard = props => {
  const { dispatch } = props;
  const { name } = props.user;

  return (
    <div className="rt-box center flex-column">
      <h3 className="name">{name}</h3>
      <Link to="/my-orders" >
        <div className="wrap">
          <div>Мои заказы</div>
        </div>
      </Link>
      <div className="wrap" onClick={() => dispatch(logout())}>
        <div>Выйти</div>
      </div>
    </div>
  );
};


export default withRouter(connect(mapStateToProps)(UserCard));

import React from "react";

export const AuthBtn = ({onClick}) =>(
    <div className="rt-box center">
        <div onClick={onClick} className="btn auth-btn">
          <h3>
            Авторизоваться
          </h3>
        </div>
      </div> 
)
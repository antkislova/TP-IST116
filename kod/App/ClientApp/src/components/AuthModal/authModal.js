import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import Modal from "../Modal/modal";
import "./authModal.css"
import Paths, { Methods } from "../../services/paths"
import { handleAuth } from "../../handlers/handleAuth"
import { mapStateToProps } from "../../store/helpers/mapStateToProps"


class AuthModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignIn: true
        }
    }

    authenticate = (data) => {
        fetch(Paths.authApi + Methods.authenticate, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (!res.ok) {
                    this.props.onClose();
                    res.json().then((data) => {
                        if (data.message) {
                            this.props.onError(data.message)
                        }
                        else this.props.onError("Что-то пошло не так...")
                    })
                    return undefined;
                } else {
                    return res.json()
                }
            })
            .then(data => {
                if (!data) return;
                this.props.onClose();
                handleAuth(data, this.props.dispatch)
            });
    }

    handleSubmit = ({ nativeEvent: e, target: form }) => {
        e.preventDefault();
        const { elements } = form;
        const data = this.state.isSignIn ? {
            email: elements["email"].value,
            password: elements["pass"].value
        } : {
            email: elements["email"].value,
            password: elements["pass"].value,
            phone: elements["phone"].value,
            name: elements["name"].value,
        };
        if (this.state.isSignIn) {
            this.authenticate(data)
        } else {
            fetch(Paths.authApi + Methods.createUser, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if(res.ok){
                    this.props.onClose();
                    this.authenticate(data);
                } else {
                    res.json().then(data => {
                        this.props.onClose();
                        this.props.onError(data.message);
                    })
                }
            })
        }
    }

    handleSwitchMode = () => this.setState((prevState) => ({ isSignIn: !prevState.isSignIn }))

    render = () => {
        const { onClose } = this.props;

        const signInForm = (
            <Fragment>
                <div className="form-group">
                    <label htmlFor="email">Электронная почта</label>
                    <input style={inputStyle} key="email" id="email" type="email" placeholder="your@email.ru" className="form-control"></input>
                </div> 
                <div className="form-group">
                    <label htmlFor="pass">Пароль</label>
                    <input style={inputStyle} key="pass" id="pass" type="password" placeholder="*****" className="form-control"></input>
                </div>
            </Fragment>
        )

        const signUpForm = (
            <Fragment>
                <div className="form-group">
                    <label htmlFor="name">Имя</label>
                    <input style={inputStyle} key="name" id="name" type="text" placeholder="Ваше имя..." className="form-control"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Телефон</label>
                    <input style={inputStyle} key="phone" id="phone" name="phone" type="text" placeholder="8 800 55 3535" className="form-control"></input>
                </div>
            </Fragment>
        )

        const { redirect, redirectionPath } = this.state;

        return (redirect ? <Redirect to={redirectionPath} /> : (<Modal onClose={onClose}>
            <form onSubmit={this.handleSubmit}>
                {this.state.isSignIn ? signInForm : signUpForm}
                {this.state.isSignIn ? "" : signInForm}
                <div className="center space-around">
                    <button className="btn btn-primary" type="submit">{this.state.isSignIn ? "Войти" : "Создать аккаунт"}</button>
                    <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
                </div>
                <div className="mode-switch">
                    <a onClick={this.handleSwitchMode}>{this.state.isSignIn ? "Зарегистрироваться" : "Войти"}</a>
                </div>
            </form>
        </Modal>)
        )
    }
}

export default connect(mapStateToProps)(AuthModal);

const inputStyle = {
    width: 250
}
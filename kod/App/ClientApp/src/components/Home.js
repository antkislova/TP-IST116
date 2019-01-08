import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import StuffCanvas from './Canvas/stuffCanvas';
import Card from './Card/card'
import AuthModal from './AuthModal/authModal'
import {AuthBtn} from "./AuthBtn/authBtn"
import { Spinner } from './Spinner/spinner'
import Paths from '../services/paths'
import toastContainer, {notifyError, notifySucces} from './ErrorToast/errorToast'
import { isVisitor, isClient } from "../store/helpers/recoginzeRole"
import UserCard from "./UserCard/userCard";
import { withRouter } from "react-router-dom";
import { mapStateToProps } from "../store/helpers/mapStateToProps"
import OrderModal from "./OrderModal/orderModal"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authModal: false,
      orderModal: false,
      loaded: false
    }
  }

  componentDidMount = () => {
    try {
      fetch(Paths.servicesApi + 'getservices')
      .then(r => r.json())
      .then(data => {
          this.setState({
            services: data.services,
            loaded: true,
            toastAllowed: true
          });
        });
    }
    catch (e) {
      alert(e);
    }
  }

  handleCardClick = (title, id) => {
    if (isClient(this.props)) {
      this.setState((prevState)=>{
        return {
          ...prevState,
          orderModal: true,
          orderTitle: title,
          serviceId: id
        }
      })
    } else {
      if (this.state.toastAllowed) {
        this.setState({
          toastAllowed: false
        });
        notifyError('Чтобы сделать заказ, Вам необходимо авторизироваться');
        setTimeout(() => {
          this.setState({ toastAllowed: true })
        }, 3000)
      }

    }
  }

  closeModal = () => {
    this.setState({ 
      authModal: false, 
      toastAllowed: true,
      orderModal: false
     })
  }

  render() {

    const authModal = this.state.authModal ? <AuthModal onError={(m)=>notifyError(m)} onClose={this.closeModal}></AuthModal> : "";

    const cards = this.state.loaded ? (this.state.services.map(c => <Card onClick={()=>this.handleCardClick(c.title, c.id)} key={c.id} imageUrl={c.imageUrl} title={c.title} />)) : "";

    const toastWrap = !this.state.authModal && !this.state.orderModal ? (toastContainer) : "";

    const orderModal = this.state.orderModal ? <OrderModal serviceId={this.state.serviceId} onError={this.handleError} onSucces={this.handleOrderSucces} title={this.state.orderTitle} onClose={this.closeModal} /> : ""

    const loader = (
      <Spinner />
    )

    return (  
      //header here
      <Fragment>
        {authModal}
        {orderModal}
        {isVisitor(this.props) ? <AuthBtn onClick={this.handleAuthModal} /> : <UserCard />}
        <StuffCanvas>
      {this.state.loaded ? cards : loader}
    </StuffCanvas>
        {toastWrap}
      </Fragment>
    )
  }

  handleAuthModal = () => {
    this.setState({ authModal: true });
  }

  handleOrderSucces = () => {
    notifySucces("Заказ успешно создан!")
  }

  handleError = (message) => {
    notifyError(message);
  }
}

export default withRouter(connect(mapStateToProps)(Home));

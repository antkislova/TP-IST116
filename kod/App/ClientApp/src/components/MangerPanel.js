import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { mapStateToProps } from "../store/helpers/mapStateToProps";
import { getOrders, setOrderStatus } from "../services/api";
import LogoutBtn from "./LogoutBtn/logoutBtn";
import OrdersTable from "./OrdersTable/ordersTable";
import OrderDetailsModal from "./OrderDetailsModal/orderDetailsModal";
import toastContainer, {notifyError, notifySucces} from './ErrorToast/errorToast'

class ManagerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: false,
      ordersStates: [],
      details: false
    };
  }

  componentDidMount = () => {
    if (!this.props.token) {
      const i = setInterval(() => {
        if (this.props.token) {
          clearInterval(i);
          this.loadOrders();
        }
      }, 500);
    } else {
      this.loadOrders();
    }
  };

  render = () => {
    return (
      <Fragment>
        {toastContainer}
        {this.state.details ? (
          <OrderDetailsModal
            onClose={() => this.setState(prev => ({
              ...prev,
              details: false
            }))}
            value={this.state.details}
          />
        ) : null}
        <LogoutBtn />
        {this.state.orders ? (
          <OrdersTable
            onStatusChange={this.handleSetState}
            onDetails={this.handleOrderDetails}
            onStateChange={this.handleStateChange}
            orders={this.state.orders}
          />
        ) : null}
      </Fragment>
    );
  };

  loadOrders = () => {
    getOrders(this.props.token)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data) return;
        console.log(data);
        const orders = data.orders.map(o => {
          return {
            id: o.id,
            created: o.created.split("T")[0],
            phone: o.user.phone,
            primaryState: o.status,
            currentState: o.status,
            details: {
              clientName: o.user.fullName,
              clientEmail: o.user.email,
              serviceName: o.service.title,
              comment: o.comment,
              duration: o.duration
            }
          };
        });
        this.setState(prev => ({
          ...prev,
          orders
        }));
      });
  };

  handleSetState = (id, status) => {
    setOrderStatus(id,status,this.props.token)
      .then((res)=>{
        console.log(res);
        if(res.ok){
          notifySucces("Статус изменен");
          this.loadOrders();
        } else {
          notifyError("Не удалось изменить статус")
        }
      })
  }

  handleOrderDetails = details => {
    this.setState(prevState => ({
      ...prevState,
      details
    }));
  };

  handleDetailsClose = () => {
    this.setState(prev => ({
      ...prev,
      details: false
    }));
  };

  handleStateChange = (id, value) => {
    this.setState(prev => ({
      ...prev,
      orders: prev.orders.map(o => {
        if (o.id === id) {
          o.currentState = value;
          return o;
        } else return o;
      })
    }));
    setTimeout(() => console.log(this.state), 2000);
  };
}

export default withRouter(connect(mapStateToProps)(ManagerPanel));

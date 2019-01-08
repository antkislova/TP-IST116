import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Spinner } from "./Spinner/spinner";
import { withRouter, Link } from "react-router-dom";
import { getOrders } from "../services/api";
import { mapStateToProps } from "../store/helpers/mapStateToProps";
import { getOrderState } from "../services/orderStateHelpers";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }

  componentDidMount() {
    getOrders(this.props.token)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if(!data) return;
        const o = data.orders
          .map(o => {
            return {
              id: o.id,
              serviceTitle: o.service.title,
              created: o.created.split("T")[0],
              orderState: getOrderState(o.status)
            };
          })
          .map(o => {
            return (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.serviceTitle}</td>
                <td>{o.created}</td>
                <td>{o.orderState}</td>
              </tr>
            );
          });
        this.setState({
          orders: o,
          loaded: true
        });
      });
  }

  notLoaded = () => (!this.state.loaded ? <Spinner /> : "");
  loaded = () =>
    this.state.loaded ? (
      <table className=" tbl">
        <tbody>
          <tr>
            <th>ID Заказа</th>
            <th>Тип услуги</th>
            <th>Создан</th>
            <th>Статус</th>
          </tr>
          {this.state.orders}
        </tbody>
      </table>
    ) : (
      ""
    );

  render = () => {
    return (
      <Fragment>
        <Link to="/">
          <img alt="back" src="back.png" className="back" title="Назад" />
        </Link>

        {this.loaded()}
        {this.notLoaded()}
      </Fragment>
    );
  };
}

export default withRouter(connect(mapStateToProps)(OrderList));

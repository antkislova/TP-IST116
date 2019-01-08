import React, { Fragment } from "react";
import { StateSelector } from "../../services/orderStateHelpers";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps } from "../../store/helpers/mapStateToProps";

class OrderTable extends React.Component {

  tableData = () => {
    let { orders, onStateChange } = this.props;
    return orders.map(o => (
      <tr key={o.id}>
        <td style={tStyle}>{o.id}</td>
        <td style={tStyle}>{o.created}</td>
        <td style={tStyle}>{o.phone}</td>
        <td>
          <StateSelector
            key={o.id}
            value={o.currentState}
            onChange={value => {
              onStateChange(o.id, parseInt(value));
            }}
          />
        </td>
        <td style={tStyle} onClick={()=>this.props.onDetails(o.details)} className="details">
          Подробнее
        </td>
        {o.primaryState !== o.currentState ? (
          <Fragment>
            <td style={tStyle} onClick={()=>this.props.onStatusChange(o.id, o.currentState)} className="details">
              Применить
            </td>
            <td
              style={tStyle}
              className="delete"
              onClick={() => this.handleCancel(o.id, o.primaryState)}
            >
              Отменить
            </td>
          </Fragment>
        ) : null}
      </tr>
    ));
  };

  render = () => {
    return (
      <div style={ordersStyle}>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <th style={tStyle}>ID Заказа</th>
              <th style={tStyle}>Создан</th>
              <th style={tStyle}>Телефон</th>
              <th style={tStyle}>Состояние</th>
            </tr>
            {this.tableData()}
          </tbody>
        </table>
      </div>
    );
  };

  handleCancel = (id, value) => {
    let { onStateChange } = this.props;
    onStateChange(id, value);
    setTimeout(() => this.forceUpdate(), 500);
  };
}

const ordersStyle = {
  margin: "auto",
  marginTop: 15,
  width: "100%"
};

const tableStyle = {
  margin: 0,
  width: 0
};

const tStyle = {
  padding: "0 30px"
};

export default withRouter(connect(mapStateToProps)(OrderTable));

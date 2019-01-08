import React from "react";
import Modal from "../Modal/modal";

class OrderDetailsModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    console.log(this);
    let { value: details } = this.props;
    return (
      <Modal onClose={this.props.onClose}>
        <h4>Заказчик</h4>
        <p>
          {details.clientName} ({details.clientEmail})
        </p>
        <h4>Услуга</h4>
        <p>{details.serviceName}</p>
        <h4>Длительность</h4>
        <p>{details.duration}</p>
        <h4>Коментарий</h4>
        <p>{details.comment}</p>
        <div className="center">
          <div className="out-btn" onClick={this.props.onClose}>Назад</div>
        </div>
      </Modal>
    );
  };
}

export default OrderDetailsModal;

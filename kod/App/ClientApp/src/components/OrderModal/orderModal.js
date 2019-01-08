import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal/modal";
import { mapStateToProps } from "../../store/helpers/mapStateToProps";
import { makeOrder } from "../../services/api"
import "./orderModal.css";

class OrderModal extends React.Component {

  render() {
    return (
      <Modal onClose={this.props.onClose}>
        <h3 className="h">{this.props.title}</h3>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="duration">Длительность</label>
            <input
              key="duration"
              id="duration"
              type="text"
              placeholder="1 месяц, 2 недели и т.д."
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comment">Комментарий</label>
            <textarea
              rows="6"
              key="comment"
              id="comment"
              type="text"
              placeholder="Опишите ваши пожелания"
              className="form-control"
            />
          </div>

          <div className="center space-around">
            <button className="btn btn-primary" type="submit">
              Оставить заказ
            </button>
            <button className="btn btn-secondary" onClick={this.props.onClose}>
              Отмена
            </button>
          </div>
        </form>
      </Modal>
    );
  }

  handleSubmit = ({ nativeEvent: e, target: form }) => {
    this.props.onClose();
    e.preventDefault();
    const { elements } = form;
    const data = {
      duration: elements["duration"].value,
      comment: elements["comment"].value,
      serviceId: this.props.serviceId,
      userId: this.props.user.id
    };
    makeOrder(data, this.props.token)
      .then(res => {
        if(res.ok){
          this.props.onSucces();
        } else {
          try {
            res.json().then(
              data => this.props.onError(data.message)
            )
          } catch (err) {
            this.props.onError("Что-то пошло не так...")
          }
        }
      });
  };
}

export default connect(mapStateToProps)(OrderModal);

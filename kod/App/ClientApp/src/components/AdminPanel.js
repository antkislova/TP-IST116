import React, { Fragment } from "react";
import LogoutBtn from "./LogoutBtn/logoutBtn";
import { createManager, getUsers, removeUser } from "../services/api";
import toastContainer, {
  notifySucces,
  notifyError
} from "./ErrorToast/errorToast";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from "./Modal/modal";
import { mapStateToProps } from "../store/helpers/mapStateToProps";
import { getRoleName } from "../services/userRolesHelpers";
class AdminPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: "list",
      openModal: false
    };
  }
  
  loadUsers = () => {
    getUsers(this.props.token)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        let tableUsers = data.users
          .map(u => ({
            id: u.id,
            name: u.fullName,
            phone: u.phone ? u.phone : "-",
            role: getRoleName(u.roleId)
          }))
          .sort((a, b) => (a.id < b.id ? -1 : 1))
          .map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.phone}</td>
              <td>{u.role}</td>
              {u.role[0] !== "А" ? (
                <td
                  onClick={() => this.handleUserRemove(u.id)}
                  className="delete"
                >
                  Удалить
                </td>
              ) : (
                <td></td>
              )}
            </tr>
          ));

        this.setState(prevState => ({
          ...prevState,
          tableUsers
        }));
      });
  };

  componentDidMount = () => {
    if(!this.props.token) return;
    this.loadUsers();
  };

  handlerNewManager = ({ nativeEvent: e, target: form }) => {
    e.preventDefault();
    const { elements } = form;
    const data = {
      email: elements["email"].value,
      password: elements["pass"].value,
      name: elements["name"].value
    };
    createManager(JSON.stringify(data), this.props.token).then(res => {
      if (res.ok) {
        this.handleModalClose();
        notifySucces("Менеджер успешно добавлен!");
        this.loadUsers();
      } else {
        notifyError("Не удалось создать менеджера");
      }
    });
  };

  handleUserRemove = id => {
    if (
      window.confirm(`Вы действительно хотите удалить пользователя с ID: ${id}`)
    ) {
      removeUser(id, this.props.token).then(res => {
        if (res.ok) {
          notifySucces("Пользователь удален");
          this.loadUsers();
        }
      });
    }
  };

  changeMode = mode => {
    this.setState(prevState => ({
      ...prevState,
      mode
    }));
  };

  handleModalClose = () => {
    this.setState({
      openModal: false
    });
  };

  handleModalOpen = () => {
    this.setState({
      openModal: true
    });
  };

  render = () => {
    const managerModal = (
      <Modal onClose={this.handleModalClose}>
        <form onSubmit={this.handlerNewManager}>
          <div className="form-group">
            <label htmlFor="email">Имя</label>
            <input
              key="name"
              id="name"
              type="text"
              placeholder="Имя менеджера"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Электронная почта</label>
            <input
              key="email"
              id="email"
              type="email"
              placeholder="email@email.ru"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pass">Пароль</label>
            <input
              key="pass"
              id="pass"
              type="password"
              placeholder="*****"
              className="form-control"
            />
          </div>
          <div className="center space-around">
            <button className="btn btn-primary" type="submit">
              Добавить менеджера
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.handleModalClose}
            >
              Отмена
            </button>
          </div>
        </form>
      </Modal>
    );

    return (
      <Fragment>
        {this.state.openModal ? managerModal : ""}
        <LogoutBtn />
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a className="list nav-link active">Список пользователей</a>
          </li>
          <li className="nav-item" onClick={this.handleModalOpen}>
            <a className="add nav-link">Добавить менеджера</a>
          </li>
        </ul>
        <UsersTable>
          {this.state.tableUsers ? this.state.tableUsers : null}
        </UsersTable>
        {toastContainer}
      </Fragment>
    );
  };
}

const usersStyle = {
  margin: "auto",
  marginTop: 15,
  width: "100%"
};

const UsersTable = ({ children }) => (
  <div style={usersStyle}>
    <table className=" tbl">
      <tbody>
        <tr>
          <th>ID Пользователя</th>
          <th>Имя</th>
          <th>Телефон</th>
          <th>Роль</th>
        </tr>
        {children}
      </tbody>
    </table>
  </div>
);

export default withRouter(connect(mapStateToProps)(AdminPanel));

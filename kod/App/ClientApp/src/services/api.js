import Paths, { Methods } from "./paths";

export const makeOrder = (data, token) => {
  return fetch(Paths.orderApi + Methods.makeOrder, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });
};

export const getOrders = (token) => {
  return fetch(Paths.orderApi + Methods.getOrders, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });
}

export const createManager = (data, token) => {
  return fetch(Paths.managementApi + Methods.createManager, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  })
}

export const getUsers = (token) => {
  return fetch(Paths.managementApi + Methods.getUsers, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  })
}

export const removeUser = (id, token) => {
  return fetch(Paths.managementApi + Methods.removeUser + `/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  })
}

export const setOrderStatus = (id, status, token) => {
  return fetch(Paths.orderApi + Methods.setOrderStatus + `/${id}?status=${status}`, {
    method: "PUT",
    headers: {
      "Authorization": "Bearer " + token
    }
  })
}
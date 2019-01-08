import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyError = message => {
  toast.error(message, {
    position: "bottom-right",
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    autoClose: 2500
  });
};

export const notifySucces = message => {
  toast.success(message, {
    position: "bottom-right",
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    autoClose: 4000
  });
};

const toastContainer = (
  <ToastContainer
    position="bottom-right"
    hideProgressBar
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnVisibilityChange
    draggable
    pauseOnHover
    transition={Bounce}
  />
);

export default toastContainer;

import React from "react";
import "./styles.scss";

function ButtonAccion(props) {
  const { children, className = "", ...other } = props;
  return (
    <button {...other} className={`btnAct btnAccion ${className}`}>
      {children}
    </button>
  );
}

export default ButtonAccion;

import React from "react";
import "./index.css";

export const Button = () => {
  return (
    <div className={`button-container`}>
      <div className="button-unlock" onClick={() => alert("unlock is here")}>
        Unlock Wallet
      </div>
    </div>
  );
};

export default Button;

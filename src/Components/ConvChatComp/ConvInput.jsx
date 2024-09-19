import React from "react";
import { BsSendFill } from "react-icons/bs";
import "./ConvInput.sass";

const ConvInput = () => {
  return (
    <>
      <div className="cov-div">
        <div className="cov"></div>
        <input className="input-cov" type="text" placeholder="Enter Message" />
        <BsSendFill className="cov-icon" color="#9568dd" size={28} />
      </div>
    </>
  );
};

export default ConvInput;

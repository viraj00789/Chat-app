import React from "react";

const Button = ({ onClick, type, text, className, onChange }) => {
  return (
    <div>
      <button
        className={className}
        type={type}
        onClick={onClick}
        onChange={onChange}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;

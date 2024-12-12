import React from "react";
import "./CategoryLabel.css";

const Badge = (props) => {
  return (
    <div className="badge" style={{ backgroundColor : props.color }}>
      {props.category}
    </div>
  );
};

export default Badge;

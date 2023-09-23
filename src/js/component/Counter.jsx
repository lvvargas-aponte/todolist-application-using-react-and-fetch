import React from "react";

const Counter = (props) => {

  const { count } = props;

  return (
    <div className="counter">
      <span>Tasks:{count}</span>
    </div>
  )
};

export default Counter;
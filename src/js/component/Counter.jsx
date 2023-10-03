import React from "react";

const Counter = (props) => {

  const { count } = props;

  return (
    <div className="counter text-center mb-3">
      <span>Tasks:{count}</span>
    </div>
  )
};

export default Counter;
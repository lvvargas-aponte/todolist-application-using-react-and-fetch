import React, { useState } from "react";

const Input = (props) => {

    const handleInputChange = (e) => {        
        props.onInputChange(e.target.value);
      };

    const handleInputKeyDown = (e) => {
        if(e.key === 'Enter' && props.inputValue.trim() != ''){
            const newTodo = props.inputValue;
            props.setTodos((prevTodos) => [...prevTodos,newTodo]);
            props.onInputChange('');
        }
    }

    return (
        <input type="text" placeholder="What needs to be done?" value={props.inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
    )
}

export default Input;
import React, { useState } from "react";

const Input = (props) => {

    const handleInputChange = (e) => {
        props.onInputChange(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && props.inputValue.trim() != '') {
            const newTodo = props.inputValue;
            props.setTodos((prevTodos) => [...prevTodos, newTodo]);
            props.onInputChange('');
        }
    }

    return (
        <input type="text" placeholder="Enter your todo(s) and click Update Todos for todo(s) to be added" value={props.inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
    )
}

export default Input;
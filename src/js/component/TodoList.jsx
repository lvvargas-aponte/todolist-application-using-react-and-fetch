import React, { useState } from "react";

import Tasks from "./Tasks";
import Input from "./Input";
import Counter from "./Counter"

//create your first component
const TodoList = () => {

	const title = 'Todo';

	const [inputValue, setInputValue] = useState('');
	const [todos, setTodos] = useState([]);


	const handleInputChange = (value) => {
		setInputValue(value);
	};

	const handleInputKeyPress = (e) => {
		if (e.key === "Enter" && inputValue.trim() != "") {
			const newTodo = inputValue;

			setTodos((prevTodos) => [...prevTodos, newTodo]);

			setInputValue('');
		}
	};

	const deleteTodo = (index) => {
		setTodos((prevTodos) =>
			prevTodos.filter((_, todoIndex) => todoIndex != index)
		)
	}


	return (
		<>
			<h1>{title}</h1>
			<div className="container">
				<Input inputValue={inputValue} onInputChange={handleInputChange} onKeyPress={handleInputKeyPress} setTodos={setTodos} />
				<Tasks todos={todos} deleteTodo={deleteTodo} />
				<Counter count={todos.length} />
			</div>
		</>
	);
};

export default TodoList;

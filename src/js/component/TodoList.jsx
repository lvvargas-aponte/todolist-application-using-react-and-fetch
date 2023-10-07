import React, { useState, useEffect } from "react";

import Tasks from "./Tasks";
import Input from "./Input";
import Counter from "./Counter"

//create your first component
const TodoList = () => {

	const title = 'Todo';

	const [inputValue, setInputValue] = useState('');
	const [todos, setTodos] = useState([]);
	const [id, setId] = useState([]);
	const [fetchTodos, setFetchedTodos] = useState([]);
	const url = 'https://playground.4geeks.com/apis/fake/todos/user/lvvargas-aponte';

	const getTodos = () => {
		return fetch(url)
			.then(resp => {
				if (!resp.ok) {
					throw new Error("Network response was not ok");
				}
				return resp.json();
			})
			.catch(error => {
				console.error(`There was a problem with the fetch operation: ${error}`);
			});
	}

	useEffect(() => {
		getTodos()
			.then(data => {
				setFetchedTodos(data);
				const todosList = data.map(todo => todo.label);
				const idList = data.map(todo => todo.id);
				setTodos(todosList);
				setId(idList);
			});
	}, [fetchTodos]);

	const handleInputChange = (value) => {
		setInputValue(value);
	};

	const deleteTodo = (index) => {
		setTodos((prevTodos) =>
			prevTodos.filter((_, todoIndex) => todoIndex != index)
		)
		setFetchedTodos((prevFetchTodos) => {
			const removedFetchTodos = prevFetchTodos.filter((_, fetchTodoIndex) => fetchTodoIndex != index)
			deleteTodos(removedFetchTodos);
		})

	}

	const getId = () => {
		return id[id.length - 1] + 1;
	}

	const deleteTodos = (removedFetchTodos) => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(removedFetchTodos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw new Error("Network response was not ok");
				}
				return console.log(resp.json());
			})
			.then(data => {
				console.log(`Updated todos: ${JSON.stringify(data)}`);
			})
			.catch(error => {
				console.error(`There was a problem with the fetch operation: ${error}`);
			});
	}

	return (
		<>
			<h1>{title}</h1>
			<div className="container">
				<Input inputValue={inputValue} url={url} fetchTodos={fetchTodos} onInputChange={handleInputChange} setTodos={setTodos} getId={getId} setFetchTodos={setFetchedTodos} />
				<Tasks todos={todos} deleteTodo={deleteTodo} />
				<Counter count={todos.length} />
			</div>
		</>
	);
};

export default TodoList;

import React, { useState, useEffect } from "react";

import Tasks from "./Tasks";
import Input from "./Input";
import Counter from "./Counter"

//create your first component
const TodoList = () => {

	const title = 'Todo';

	const [inputValue, setInputValue] = useState('');
	const [todos, setTodos] = useState([]);
	const [fetchedTodos, setFetchedTodos] = useState([]);



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

	const updateTodos = () => {
		const updatedTodos = todos.map(todo => ({
			label: todo,
			done: false,
		}));

		fetch('https://playground.4geeks.com/apis/fake/todos/user/lvvargas-aponte', {
			method: "PUT",
			body: JSON.stringify(updatedTodos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw new Error("Network response was not ok");
				}
				return resp.json();
			})
			.then(data => {
				console.log(`Updated todos: ${data}`);
				window.location.reload();
			})
			.catch(error => {
				console.error(`There was a problem with the fetch operation: ${error}`);
			});
	};

	useEffect(() => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/lvvargas-aponte')
			.then(resp => {
				if (!resp.ok) {
					throw new Error("Network response was not ok");
				}
				return resp.json();
			})
			.then(data => {
				setFetchedTodos(data);
			})
			.catch(error => {
				console.error(`There was a problem with the fetch operation: ${error}`);
			});
	}, []);

	const deleteTodos = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/lvvargas-aponte', {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw new Error("Network response was not ok");
				}
				return resp.json();
			})
			.then(data => {
				console.log(`Deleted all todos: ${data}`);
				setFetchedTodos([]);
			})
			.catch(error => {
				console.error(`There was a problem with the fetch operation: ${error}`);
			})
		fetch('https://playground.4geeks.com/apis/fake/todos/user/lvvargas-aponte', {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw new Error("Network response was not ok");
				}
				window.location.reload();
				return resp.json();
			})
			.catch(error => {
				console.error(`There was a problem with the fetch operation: ${error}`);
			})
	};


	return (
		<>
			<h1>{title}</h1>
			<div className="container">
				<Input inputValue={inputValue} onInputChange={handleInputChange} onKeyPress={handleInputKeyPress} setTodos={setTodos} />
				<Tasks todos={fetchedTodos} deleteTodo={deleteTodo} />
				<Counter count={fetchedTodos.length} />
				<div className="d-flex justify-content-center">
					<button className="me-5" onClick={updateTodos}>Update Todos</button>
					<button onClick={deleteTodos}>Delete Todos</button>
				</div>

			</div>
		</>
	);
};

export default TodoList;

import React from "react";

const Input = (props) => {
    const handleInputChange = (e) => {
        props.onInputChange(e.target.value);
    };

    const handleInputKeyDown = (e) => {

        if (e.key === 'Enter' && props.inputValue.trim() != '') {
            const newTodo = { label: props.inputValue, done: false, id: props.getId() };
            props.setTodos((prevTodos) => [...prevTodos, newTodo.label]);
            props.onInputChange('');
            props.setFetchTodos((prevFetchTodos) => {
                const updatedFetchTodos = [...prevFetchTodos, newTodo];
                updateTodos(updatedFetchTodos)
            });
        }

    }

    const updateTodos = (updatedFetchTodos) => {
        fetch(props.url, {
            method: "PUT",
            body: JSON.stringify(updatedFetchTodos),
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
        <input type="text" placeholder="Enter your todo(s) and click Update Todos for todo(s) to be added" value={props.inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
    )
}

export default Input;
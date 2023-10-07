import React from "react";
import 'bootstrap';

const Tasks = (props) => {

    const { todos, deleteTodo } = props;


    return (
        <>
            <div className="lines"></div>
            <ul className="todosBody">
                {todos.map((todo, index) => {
                    return <li key={index} className="todos"> {todo} <span className="delete-icon float-end" onClick={() => deleteTodo(index)}>&#x2716;</span> </li>
                })}
            </ul>
        </>
    );


}

export default Tasks;
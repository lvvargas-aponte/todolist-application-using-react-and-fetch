import React from "react";
import 'bootstrap';

const Tasks = (props) => {

    const { todos } = props;


    return (
        <>
            <div className="lines"></div>
            <ul className="todosBody">
                {todos.map((todo, index) => {
                    return <li key={index} className="todos"> {todo.label} </li>
                })}
            </ul>
        </>
    );


}

export default Tasks;
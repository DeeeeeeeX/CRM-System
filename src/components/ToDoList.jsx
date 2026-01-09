import React, {useEffect} from 'react';
import '../css/ToDolist.css'
import ToDoItem from "./ToDoItem.jsx";
import {urlGetAll, urlGetCompletedTask, urlGetInWorkTask, getToDo} from "../api/api.js";

const ToDoList = (props) => {

    let urlFetch
    if (props.activeTab === 1) {urlFetch = urlGetAll}
    else if (props.activeTab === 2) {urlFetch = urlGetInWorkTask}
    else if (props.activeTab === 3) {urlFetch = urlGetCompletedTask}

    useEffect(() => {
        getToDo(urlFetch, props.setDataTasksAll)
    }, [props.rerender])

    return (<div>
        {props.dataTasksAll.data.map((task) => (<ToDoItem
            key={task.id}
            task={task}
            editingId={props.editingId}
            inputValue={props.inputValue}
            setInputValue={props.setInputValue}
            handleEditing={props.handleEditing}
            handleSave={props.handleSave}
            handleDeleting={props.handleDeleting}
            handleCompleted={props.handleCompleted}
            handleBackEditing={props.handleBackEditing}
        />))}
    </div>)
};

export default ToDoList;
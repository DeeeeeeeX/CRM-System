import React from 'react';

const ToDoItem = ({
  task,
  editingId,
  inputValue,
  setInputValue,
  handleEditing,
  handleSave,
  handleDeleting,
  handleCompleted,
  handleBackEditing,
}) => {
  return (
    <div className="taskEl">
      <label className="checkbox">
        <input
          className="checkbox"
          checked={task.isDone}
          onChange={(e) => handleCompleted(task, e.target.checked)}
          type="checkbox"
        />
      </label>
      {editingId === task.id ? (
        <input
          className="text-editing"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <div className={!task.isDone ? 'title' : 'title-completed'}>{task.title}</div>
      )}
      {editingId === task.id ? (
        <>
          <button className="buttonEdit" onClick={() => handleSave(task)}>
            <div className="saveSvg"></div>
          </button>
          <button className="buttonBack" onClick={() => handleBackEditing()}>
            <div className="backSvg"></div>
          </button>
        </>
      ) : (
        <>
          <button
            className="buttonEdit"
            onClick={() => {
              handleEditing(task);
            }}
          >
            <div className="editSvg"></div>
          </button>
          <button
            className="buttonDelete"
            onClick={() => {
              handleDeleting(task);
            }}
          >
            <div className="deleteSvg"></div>
          </button>
        </>
      )}
    </div>
  );
};

export default ToDoItem;

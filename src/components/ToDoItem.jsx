import React from 'react';

const ToDoItem = ({
  task,
  handleEditing,
  handleSave,
  handleDeleting,
  handleCompleted,
  handleBackEditing,
  editingIdArray,
  editingTitles,
  setTitleMap,
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
      {editingIdArray.includes(task.id) ? (
        <input
          className="text-editing"
          type="text"
          value={editingTitles.get(task.id)}
          onChange={(e) => setTitleMap(task.id, e.target.value)}
        />
      ) : (
        <div className={!task.isDone ? 'title' : 'title-completed'}>{task.title}</div>
      )}
      {editingIdArray.includes(task.id) ? (
        <>
          <button className="buttonEdit" onClick={() => handleSave(task)}>
            <div className="saveSvg"></div>
          </button>
          <button className="buttonBack" onClick={() => handleBackEditing(task)}>
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

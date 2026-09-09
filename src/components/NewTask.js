import { useState } from "react";
import TaskCategory from "./TaskCategory";

function NewTask() {
  const [getTaskName, setTaskName] = useState("");
  const [getPriority, setPriority] = useState(1);
  const [getSubTask, setSubTask] = useState("");
  const [getSubTasks, setSubTasks] = useState([]);
  const [getDescription, setDescription] = useState("");
  const [getDuration, setDuration] = useState(60);
  const [getAllTasks, setAllTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const changeTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const changePriority = (event) => {
    setPriority(event.target.value);
  };

  const changeSubTask = (event) => {
    setSubTask(event.target.value);
  };

  const changeDescription = (event) => {
    setDescription(event.target.value);
  };

  const changeDuration = (event) => {
    setDuration(event.target.value);
  };

  const addSubTask = () => {
    if (getSubTask.trim() === "") {
      window.alert("Please enter a sub task.");
      return;
    }

    const updatedSubTasks = [...getSubTasks, getSubTask.trim()];
    setSubTasks(updatedSubTasks);
    setSubTask("");
  };

  const deleteSubTask = (index) => {
    const updatedSubTasks = getSubTasks.filter((element, i) => i !== index);
    setSubTasks(updatedSubTasks);
  };

  const validateTask = () => {
    if (getTaskName.trim().length < 5) {
      window.alert("Task name must contain at least 5 characters.");
      return false;
    }

    if (getPriority < 1 || getPriority > 10) {
      window.alert("Priority level must be from 1 to 10.");
      return false;
    }

    if (getSubTasks.length < 1) {
      window.alert("Please add at least 1 sub task.");
      return false;
    }

    if (getDescription.trim().length < 3) {
      window.alert("Task description must contain at least 3 characters.");
      return false;
    }

    if (getDuration < 60) {
      window.alert("Task duration must be at least 60 minutes or 1 hour.");
      return false;
    }

    return true;
  };

  const clearFields = () => {
    setTaskName("");
    setPriority(1);
    setSubTask("");
    setSubTasks([]);
    setDescription("");
    setDuration(60);
  };

  const createNewTask = () => {
    if (!validateTask()) {
      return;
    }

    const newTask = {
      name: getTaskName.trim(),
      priority: Number(getPriority),
      subTasks: getSubTasks,
      description: getDescription.trim(),
      duration: Number(getDuration),
    };

    const updatedTaskList = [...getAllTasks, newTask];
    setAllTasks(updatedTaskList);
    clearFields();
  };

  const deleteInfo = (index) => {
    const updatedTaskList = getAllTasks.filter((element, i) => i !== index);
    setAllTasks(updatedTaskList);

    if (currentIndex === index) {
      setIsEditing(false);
      setCurrentIndex(null);
      clearFields();
    }
  };

  const editInfo = (index) => {
    const taskToEdit = getAllTasks[index];
    setTaskName(taskToEdit.name);
    setPriority(taskToEdit.priority);
    setSubTasks(taskToEdit.subTasks);
    setDescription(taskToEdit.description);
    setDuration(taskToEdit.duration);
    setIsEditing(true);
    setCurrentIndex(index);
    window.scrollTo(0, 0);
  };

  const updateTask = () => {
    if (!validateTask()) {
      return;
    }

    const updatedTask = {
      name: getTaskName.trim(),
      priority: Number(getPriority),
      subTasks: getSubTasks,
      description: getDescription.trim(),
      duration: Number(getDuration),
    };

    const updatedTaskList = getAllTasks.map((task, index) =>
      index === currentIndex ? updatedTask : task
    );

    setAllTasks(updatedTaskList);
    setIsEditing(false);
    setCurrentIndex(null);
    clearFields();
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentIndex(null);
    clearFields();
  };

  const taskListWithIndex = getAllTasks.map((task, index) => ({
    task: task,
    originalIndex: index,
  }));

  const notImportantTasks = taskListWithIndex.filter(
    (element) => element.task.priority <= 3
  );

  const standardTasks = taskListWithIndex.filter(
    (element) => element.task.priority >= 4 && element.task.priority <= 7
  );

  const importantTasks = taskListWithIndex.filter(
    (element) => element.task.priority >= 8
  );

  return (
    <>
      <section className="formCard">
        <div className="sectionTitle">
          <p>{isEditing ? "EDIT MODE" : "NEW TASK"}</p>
          <h2>{isEditing ? "Update Task" : "Create a Task"}</h2>
        </div>

        <div className="taskForm">
          <label>
            Task Name
            <input
              type="text"
              value={getTaskName}
              onChange={changeTaskName}
              placeholder="Enter task name"
            />
          </label>

          <label>
            <span className="labelRow">
              Priority Level <strong>{getPriority}</strong>
            </span>
            <input
              type="range"
              min="1"
              max="10"
              value={getPriority}
              onChange={changePriority}
            />
          </label>

          <div className="fullWidth">
            <label>Sub Tasks</label>
            <div className="subTaskInput">
              <input
                type="text"
                value={getSubTask}
                onChange={changeSubTask}
                placeholder="Enter a sub task"
              />
              <button type="button" onClick={addSubTask}>
                Add Sub Task
              </button>
            </div>

            {getSubTasks.length > 0 ? (
              <ul className="subTaskPreview">
                {getSubTasks.map((subTask, index) => (
                  <li key={index}>
                    <span>{subTask}</span>
                    <button type="button" onClick={() => deleteSubTask(index)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="emptySubTasks">No sub tasks added yet.</p>
            )}
          </div>

          <label className="fullWidth">
            Task Description
            <textarea
              value={getDescription}
              onChange={changeDescription}
              placeholder="Enter task description"
              rows="4"
            ></textarea>
          </label>

          <label className="fullWidth">
            Task Duration in Minutes
            <input
              type="number"
              min="60"
              value={getDuration}
              onChange={changeDuration}
            />
          </label>

          <div className="formActions fullWidth">
            {isEditing ? (
              <>
                <button className="primaryButton" onClick={updateTask}>
                  Update Task
                </button>
                <button className="cancelButton" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="primaryButton" onClick={createNewTask}>
                Create Task
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="taskListSection">
        <div className="listHeader">
          <div>
            <p className="eyebrow">YOUR SCHEDULE</p>
            <h2>List of My Tasks</h2>
          </div>
          <span className="taskCount">
            {getAllTasks.length} {getAllTasks.length === 1 ? "Task" : "Tasks"}
          </span>
        </div>

        <div className="categoryGrid">
          <TaskCategory
            title="Not Important"
            tasks={notImportantTasks}
            className="notImportantCategory"
            onDelete={deleteInfo}
            onEdit={editInfo}
          />
          <TaskCategory
            title="Standard"
            tasks={standardTasks}
            className="standardCategory"
            onDelete={deleteInfo}
            onEdit={editInfo}
          />
          <TaskCategory
            title="Important"
            tasks={importantTasks}
            className="importantCategory"
            onDelete={deleteInfo}
            onEdit={editInfo}
          />
        </div>
      </section>
    </>
  );
}

export default NewTask;

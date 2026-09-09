function TaskDetails(props) {
  const { task, number, onDelete, onEdit } = props;

  const priorityDisplay =
    task.priority <= 3
      ? "NOT IMPORTANT"
      : task.priority <= 7
      ? "STANDARD"
      : "IMPORTANT";

  const durationInHours = task.duration / 60;
  const durationDisplay =
    durationInHours % 1 === 0
      ? durationInHours
      : durationInHours.toFixed(1);

  const taskLength = durationInHours > 24 ? "LONG TASK" : "SHORT TASK";

  return (
    <article className="taskCard">
      <div className="taskNumber">{number}</div>

      <div className="taskContent">
        <div className="taskHeading">
          <div>
            <h3>{task.name}</h3>
            <span className={`priority priority${priorityDisplay.replace(" ", "")}`}>
              {priorityDisplay}
            </span>
          </div>

          <div className="taskActions">
            <button className="editButton" onClick={onEdit}>
              Edit
            </button>
            <button className="deleteButton" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>

        <div className="taskSection">
          <h4>Sub Tasks</h4>
          <ul>
            {task.subTasks.map((subTask, index) => (
              <li key={index}>{subTask}</li>
            ))}
          </ul>
        </div>

        <p className="description">{task.description}</p>

        <div className="duration">
          <span>
            {durationDisplay} {durationInHours === 1 ? "hour" : "hours"}
          </span>
          <strong>{taskLength}</strong>
        </div>
      </div>
    </article>
  );
}

export default TaskDetails;

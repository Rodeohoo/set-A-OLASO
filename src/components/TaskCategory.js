import TaskDetails from "./TaskDetails";

function TaskCategory(props) {
  const { title, tasks, className, onDelete, onEdit, editingIndex } = props;

  return (
    <div className={`categoryColumn ${className}`}>
      <div className="categoryHeader">
        <h3>{title}</h3>
        <span>{tasks.length}</span>
      </div>

      {tasks.length > 0 ? (
        <div className="categoryTasks">
          {tasks.map((element, index) => (
            <TaskDetails
              key={element.originalIndex}
              task={element.task}
              number={index + 1}
              isEditing={element.originalIndex === editingIndex}
              onDelete={() => onDelete(element.originalIndex)}
              onEdit={() => onEdit(element.originalIndex)}
            />
          ))}
        </div>
      ) : (
        <div className="emptyCategory">
          <p>No tasks in this category.</p>
        </div>
      )}
    </div>
  );
}

export default TaskCategory;

import React from "react";

function TaskDetail({ task }) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.start.toString()}</p>
      <p>{task.end.toString()}</p>
      <p>{task.description}</p>
      hola que tal
    </div>
  );
}

export default TaskDetail;
